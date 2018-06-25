const Sequelize = require("sequelize");
const Case = require('../models').CASE;

const getAllCases = async function(req, res) {
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

    console.log('=================');
    console.log(sort_param);
    if (sort_param == 'Matter ID') {
        sort_param = 'matter_id';
    } else if (sort_param == 'Name') {
        sort_param = 'name';
    } else if (sort_param == 'Last Updated') {
        sort_param = 'updated_at';
    } else {
        sort_param = 'matter_id';
    }
    console.log(sort_param);


    let filter_sql = { org_id: user.dataValues.org_id }, sort_sql;
    let now = new Date();

    if (search_name) {
        if (!isNaN(search_name)) { // find by matter id
            filter_sql.matter_id = {
                [Op.like]: '%' + search_name + '%'
            }
        } else { // find by sub name
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
    sort_sql = [[sort_param, 'ASC']];

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
    return cases;
}

module.exports.getAllCases = getAllCases;

const getFilterSql = async function (req) {
    let filter_sql = { org_id: req.user.dataValues.org_id };
    let now = new Date();
    let search_name = req.body.search_name;
    let filter_param = req.body.filter_param

    if (search_name) {
        if (!isNaN(search_name)) { // find by matter id
            filter_sql.matter_id = {
                [Op.like]: '%' + search_name + '%'
            }
        } else { // find by sub name
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

    return filter_sql;
}

module.exports.getFilterSql = getFilterSql;

const getCount = async function(where) {
    let err, data;
    [err, data] = await to(
        Case.count({
            where: where
        })
    );
    if(err) TE(err.message);
    return data;
}
module.exports.getCount = getCount;
