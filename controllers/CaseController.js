const Sequelize = require('sequelize');
const Case = require('../models').CASE;
const Category = require('../models').CATEGORY;
const Scenario = require('../models').SCENARIO;
const Disputed_t1_ta = require('../models').DISPUTED_T1_TA;
const Organization_guest_permissions = require('../models').ORGANIZATION_GUEST_PERMISSIONS;
const CaseService = require('./../services/CaseService');
const ReE = require('../utils').ReE;
const ReS = require('../utils').ReS;
const to = require('../utils').to;

/**
 * Cases default filter params
 * @type {*[]}
 */
const filter_params = [
    { id: 1, filter_string: 'All' },
    { id: 2, filter_string: 'Updated in the last week' }
];
/**
 * Cases default sort_params
 * @type {*[]}
 */
const sort_params = [
    { id: 1, field: 'matter_id', field_mark: 'Matter ID' },
    { id: 2, field: 'name', field_mark: 'Name' },
    { id: 3, field: 'updated_at', field_mark: 'Last Updated' },
    { id: 4, field: 'matter_id', field_mark: 'Amount in Dispute' }
];
/**
 * Get filtered cases
 * @method getFilter
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const getFilter = async function(req, res) {

    try {
        const Op = Sequelize.Op;
        let err, cases;

        // get total count matching criteria
        [err, totalCount] = await to(
            Case.count({
                where: CaseService.getFilterSql(req)
            })
        );
        if (err) {
            return ReE(res, err);
        }

        [err, cases] = await to(
            CaseService.getAllCases(req, res)
        );
        if (err) {
            return ReE(res, err);
        }

        return ReS(res, {page_number: req.body.page_number, items_per_page: req.body.items_per_page, totalCount, cases, role_id: req.user.role_id});
    }
    catch(err) {
        return ReE(res, err);
    }
};
/**
 * Get case filter params
 * @method getFilterParams
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const getFilterParams = async function(req, res) {
    return ReS(res, filter_params);
};
/**
 * Get case sort params
 * @method getSortParams
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const getSortParams = async function(req, res) {
    return ReS(res, sort_params);
};
/**
 * Create case
 * @method createCase
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const createCase = async function(req, res) {
    let err, cases;
    try {
        await to(
            Case.create({
                org_id: req.user.org_id,
                matter_id: req.body.matter_id,
                name: req.body.name,
                description: req.body.description,
                updated_by_name: req.user.first_name + ' ' + req.user.last_name,
                updated_by_id: req.user.user_id
            })
        );

        // get total count matching criteria
        [err, totalCount] = await to(
            Case.count({
                where: CaseService.getFilterSql(req)
            })
        );
        if (err) {
            return ReE(res, err);
        }

        [err, cases] = await to(
            CaseService.getAllCases(req, res)
        );
        if (err) {
            return ReE(res, err);
        }

        return ReS(res, {page_number: req.body.page_number, items_per_page: req.body.items_per_page, totalCount, cases, role_id: req.user.role_id});
    }
    catch(err) {
        return ReE(res, err);
    }
};
/**
 * Get case
 * @method getCase
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const getCase = async function(req, res) {
    const case_id = req.query.case_id;
    let err
    [err, data] = await to(
        Case.findOne({
            where: {case_id: case_id}
        })
    );
    if (err) {
        return ReE(res, err);
    }

    return ReS(res, {matter_id: data.matter_id, name: data.name, description: data.description});
};
/**
 * Update case
 * @method updateCase
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const updateCase = async function(req, res) {
    const case_id = req.body.case_id;
    let err, data;
    [err, data] = await to(
        Case.update({
            matter_id: req.body.matter_id,
            name: req.body.name,
            description: req.body.description }, {
            where: {case_id: case_id}
        })
    );
    if (err) {
        return ReE(res, err);
    }

    [err, data] = await to(
        Case.findOne({
            where: {case_id: case_id}
        })
    );
    if (err) {
        return ReE(res, err);
    }

    return ReS(res, {matter_id: data.matter_id, name: data.name, description: data.description});
};
/**
 * Delete case
 * @method deleteCase
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const deleteCase = async function(req, res) {
    let err, cases;
    try {
        const case_id = req.body.case_id;
        await to(
            Scenario.destroy({
                where: {case_id: case_id}
            })
        );
        await to(
            Category.destroy({
                where: {case_id: case_id}
            })
        );
        await to(
            Disputed_t1_ta.destroy({
                where: {case_id: case_id}
            })
        );
        await to(
            Organization_guest_permissions.destroy({
                where: {case_id: case_id}
            })
        );
        
        [err, data] = await to(
            Case.destroy({
                where: {case_id: case_id}
            })
        );

        if (err) {
            return ReE(res, err);
        }

        // get total count matching criteria
        [err, totalCount] = await to(
            Case.count({
                where: CaseService.getFilterSql(req)
            })
        );
        if (err) {
            return ReE(res, err);
        }

        [err, cases] = await to(
            CaseService.getAllCases(req, res)
        );
        if (err) {
            return ReE(res, err);
        }

        return ReS(res, {page_number: req.body.page_number, items_per_page: req.body.items_per_page, totalCount, cases, role_id: req.user.role_id});
    }
    catch(err) {
        return ReE(res, err);
    }
};

module.exports = {
    createCase, getCase, updateCase, deleteCase, getFilter, getFilterParams, getSortParams
};
