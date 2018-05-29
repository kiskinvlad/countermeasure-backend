const Sequelize = require("sequelize");
const Case = require('../models').CASE;
const Organization = require('../models').ORGANIZATION;

const filter_params = [
    { id: 1, filter_string: "All" },
    { id: 2, filter_string: "Updated in the last week" }
];

const sort_params = [
    { id: 1, field: "matter_id", field_mark: "Matter ID" },
    { id: 2, field: "name", field_mark: "Name" },
    { id: 3, field: "updated_at", field_mark: "Last Updated" },
    { id: 4, field: "matter_id", field_mark: "Amount in Dispute" }
];

const getFilter = async function(req, res) {

    try {
        const Op = Sequelize.Op;
        let err, user, data;
    
        //get user
        user = req.user;
    
        //get filter_param, sort_param, page_number(start from 1), items_per_page from body
        data = req.body;
        let filter_param = data.filter_param,
            sort_param = data.sort_param,
            page_number = data.page_number,
            items_per_page = data.items_per_page,
            search_name = data.search_name;
    
        let filter_sql = { org_id: user.dataValues.org_id }, sort_sql;
        let now = new Date();

        if (search_name) {
            if (!isNaN(search_name)) { // find by matter id
                filter_sql.matter_id = {
                    [Op.like]: '%' + search_name + '%'
                }
            } else { // find by sub name
                console.log(search_name);
                filter_sql.name = {
                    [Op.like]: '%' + search_name + '%'
                }
            }
        }
    
        switch (filter_param.id) {
            case 1: // All
                break;
            case 2: // Updated in the last week
                filter_sql.updated_at = { 
                    [Op.gte]: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
                    [Op.lt]: new Date()
                };
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
    
        if (err) {
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
        console.log("pagenumber=", page_number);
        return ReS(res, {page_number, items_per_page, totalCount, cases});
    } 
    catch(err) {
        return ReE(res, err);
    }
}

const getFilterParams = async function(req, res) {
    return ReS(res, filter_params);
}

const getSortParams = async function(req, res) {
    return ReS(res, sort_params);
}

const createCase = async function(req, res) {

    console.log("==========create case============");
    try {
        [err, org] = await to(
            Organization.findOne({
                where: {org_id: req.user.dataValues.org_id}, 
            })
        );
        Case.sync().then(function() {
            console.log(org);
            return Case.create({
                org_id: req.user.org_id,
                matter_id: req.body.matter_id,
                name: req.body.name,
                description: req.body.description,
                updated_by_name: req.user.name,
                updated_by_id: req.user.userid
            })
        });
    }
    catch(err) {
        return ReE(res, err);
    }
}

module.exports = {
    createCase, getFilter, getFilterParams, getSortParams
}