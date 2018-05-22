const Case = require('../models').CASE;

const filter_params = [
    { id: 1, filter_string: "All" },
    { id: 2, filter_string: "Updated in the last week" }
];

const sort_params = [
    { id: 1, field: "matter_id", field_mark: "Matter ID" },
    { id: 2, field: "name", field_mark: "Name" },
    { id: 3, field: "updatedAt", field_mark: "Last Updated" },
    { id: 4, field: "matter_id", field_mark: "Amount in Dispute" }
];

const getFilter = async function(req, res){
    console.log("get filter");
    let err, user, data;
    
    //get user
    user = req.user;

    //get filter_param, sort_param, page_number(start from 1), items_per_page from body
    data = req.body;
    let filter_param = data.filter_param,
        sort_param = data.sort_param,
        page_number = data.page_number,
        items_per_page = data.items_per_page;

    let filter_sql = { org_id: user.dataValues.org_id }, sort_sql;
    console.log("getfilter params=", filter_param, sort_param, page_number, items_per_page);

    let now = new Date();

    switch(filter_param.id){
        case 1: // All
            break;
        case 2: // Updated in the last week
            filter_sql.updatedAt = { $gt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) };
            break;
        default: //exception
            break;
    }
    
    //sorting query
    sort_sql = [[sort_param.field, 'DESC']]; 

    // find all by pagination
    [err, cases] = await to(
        Case.findAll({
            limit: items_per_page, 
            offset: items_per_page * (page_number - 1), 
            where: filter_sql, 
            order: sort_sql
        })
    );

    if (err){
        return ReE(res, err);
    }

    // get total count matching criteria
    [err, totalCount] = await to(
        Case.count({
            where: filter_sql
        })
    );

    if (err){
        return ReE(res, err);
    }
    return ReS(res, {page_number, items_per_page, totalCount, cases});
}

const getFilterParams = async function(req, res){
    return ReS(res, filter_params);
}

const getSortParams = async function(req, res){
    return ReS(res, sort_params);
}
module.exports = {
    getFilter, getFilterParams, getSortParams
}