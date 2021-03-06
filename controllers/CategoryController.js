
const CategoryService = require('./../services/CategoryService');
const DisputedService = require('./../services/DisputedService');
const jsonexport = require('jsonexport');

const Category = require('../models').CATEGORY;
const ReE = require('../utils').ReE;
const ReS = require('../utils').ReS;
const to = require('../utils').to;
/**
 * Create category
 * @method create
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const create = async function(req, res) {
    res.setHeader ( 'Content-Type', 'application/json' );
    const body = req.body;

    if(!body.case_id) {
        return ReE(res, 'Category case id is not exist', 422);
    }
    if(!body.disputed_t1_ta_id) {
        return ReE(res, 'Personal income tax year in dispute id is not exist', 422);
    }
    if(body.name === null) {
        return ReE(res, 'Category name is not exist', 422);
    }
    else {
        let err, position;
        if(err) return ReE(res, err, 422);
        return CategoryService.getLastCategory().then((category) => {
            if(category[0]) {
                position = category[0].order_position + 1;
            } else {
                position = 1;
            }
            body['order_position'] = position;
            return CategoryService.create(body).then((category) => {
                return ReS(res, { message: 'Successfully created new category.', category: category.toWeb() }, 201);
            }).catch(err => { return ReE(res, err, 422) });
        }).catch(err => { return ReE(res, err, 422) });
    }
};
/**
 * Get categories by case
 * @method getAllForCase
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const getAllForCase = async function(req, res) {

    /**
     * @param {{filter_param:object}} filter_param
     * @param {{sort_param:object}} sort_param
     */
    const case_id = req.body.filter_param.id;
    const data = req.body;
    let err, categories, categoriesArray, disputed;
    let sort_param = data.sort_param,
        page_number = data.page_number,
        items_per_page = data.items_per_page;
    let filter_sql = { case_id: case_id }, sort_sql;
    sort_sql = [[sort_param.field]];
    [err, categories] = await to(CategoryService.getCategories(
        items_per_page,
        items_per_page * (page_number - 1),
        filter_sql,
        sort_sql)
    );
    if(err) return ReE(res, err, 422);
    categoriesArray = JSON.parse(JSON.stringify(categories));
    for(let i = 0; i < categoriesArray.length; i++) {
        disputed = await DisputedService.getDisputed(categoriesArray[i].disputed_t1_ta_id).then(data => {
            return data;
        }).catch(err => { return ReE(res, err, 422) });
        categoriesArray[i].disputed = {taxpayer: disputed.taxpayer, taxyear: disputed.year};
        categoriesArray[i].taxpayer = disputed.taxpayer;
    }
    [err, totalCount] = await to(
        Category.count({
            where: filter_sql
        })
    );
    return ReS(res, {page_number, items_per_page, totalCount, categories: categoriesArray});
};
/**
 * Move category
 * @method moveCategory
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const moveCategory = async function(req, res) {

    /**
     * @param {{first_category:object}} first_category
     * @param {{second_category:object}} second_category
     */
    const first_category = req.body.first_category;
    const second_category = req.body.second_category;

    CategoryService.moveCategories(
        first_category,
        second_category
    ).then(() => {
        getAllForCase(req, res).then(() => {
            console.log('Success get categories')
        });
    }).catch(err => { return ReE(res, err, 422) });
};
/**
 * Delete category from list
 * @method deleteCategoryForList
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const deleteCategoryForList = async function(req, res) {
    const category_id = req.body.category_id;

    CategoryService.deleteCategory(
        category_id
    ).then(() => {
        getAllForCase(req, res).then(() => {
            console.log('Success get categories')
        });
    }).catch(err => { return ReE(res, err, 422) });
};
/**
 * Get category
 * @method get
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const get = async function(req, res) {
    const category_id = req.query.category_id;
    let category, err;
    [err, category] = await to(CategoryService.getCategory(category_id));
    if (err) return ReE(res, err, 422);
    return ReS(res, {message: 'Successfully get category.', category: category.toWeb()}, 200);
};
/**
 * Update category
 * @method update
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const update = async function (req, res) {
    res.setHeader ( 'Content-Type', 'application/json' );
    const body = req.body;

    if(!body.category_id) {
        return ReE(res, 'Category id is not exist', 422);
    }
    if(!body.case_id) {
        return ReE(res, 'Category case id is not exist', 422);
    }
    if(!body.disputed_t1_ta_id) {
        return ReE(res, 'Personal income tax year in dispute id is not exist', 422);
    }
    if(body.name === null) {
        return ReE(res, 'Category name is not exist', 422);
    }
    else {
        let err, category;
        [err, category] = await to(CategoryService.update(body));
        if (err) return ReE(res, err, 422);
        return ReS(res, {message: 'Successfully update category.', category: category.toWeb()}, 201);
    }
};
/**
 * Remove category
 * @method remove
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const remove = async function(req, res) {
    res.setHeader ( 'Content-Type', 'application/json' );
    let data, err, category;
    data = req.query;

    [err, category] = await to(CategoryService.deleteCategory(data.id));
    if(err) return ReE( res, err, 422 );
    return ReS(res, { message: 'Successfully delete category.' }, 204);
};

module.exports = {
    get, update, create, remove, getAllForCase, moveCategory, deleteCategoryForList
};