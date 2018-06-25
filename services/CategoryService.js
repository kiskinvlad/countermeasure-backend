const Category = require('../models').CATEGORY;
const TE = require('../utils').TE;
const to = require('../utils').to;
/**
 * Get categories
 * @method getCategories
 * @param limit
 * @param offset
 * @param where
 * @param order
 * @return {Promise<*>}
 */
const getCategories = async function(limit, offset, where, order){
    let categories_info = {};
    categories_info.status = 'get categories';
    if(!where.case_id) TE('Needs case id');
    let categories, err;
    [err, categories] = await to(Category.findAll({
        limit: limit || null,
        offset: offset || null,
        where: where,
        order: order || null
    }));
    if(err) TE(err.message);
    if(!categories) TE('Cannot find categories');
    return categories;
};
module.exports.getCategories = getCategories;
/**
 * Get last category
 * @method getLastCategory
 * @return {Promise<*>}
 */
const getLastCategory = async function() {
    let category, err;
    [err, category] = await to(Category.findAll({
        limit: 1,
        order: [ [ 'order_position', 'DESC' ]]
    }));
    if(err) TE(err.message);
    return category;
};
module.exports.getLastCategory = getLastCategory;
/**
 * Change categories positions
 * @method moveCategories
 * @param firstCategory
 * @param secondCategory
 * @return {Promise<T>}
 */
const moveCategories = async function(firstCategory, secondCategory){
    let categories_info = {};
    categories_info.status = 'move categories';

    if(!firstCategory.id) TE('Needs first category id');
    if(!secondCategory.id) TE('Needs second category id');
    return Category.update(
        {order_position: secondCategory.order_position},
        {where: {category_id: firstCategory.id}})
        .then(() => {
            return Category.update(
                {order_position: firstCategory.order_position},
                {where: {category_id: secondCategory.id}}
            ).then(() => {return {status: 'success'}}).catch(err => TE(err.message))
        }).catch(err => TE(err.message));
};
module.exports.moveCategories = moveCategories;
/**
 * Delete category
 * @method deleteCategory
 * @param id
 * @return {Promise<T>}
 */
const deleteCategory = async function(id) {
    let categories_info = {};
    categories_info.status = 'delete category';

    if(!id) TE('Needs category id');
    return Category.destroy(
        {where: {category_id: id}}
    ).then(() => {return {status: 'success'}}).catch(err => TE(err.message))
};
module.exports.deleteCategory = deleteCategory;
/**
 * Get Category
 * @method getCategory
 * @param id
 * @return {Promise<Model>}
 */
const getCategory = async function(id) {
    let categories_info = {};
    let where = {category_id: id};
    categories_info.status = 'get category';

    if(!id) TE('Needs category id');
    return Category.findOne({
        where: where
    }).then((data) => {return data}).catch(err => TE(err.message))
};
module.exports.getCategory = getCategory;
/**
 * Create category
 * @method createCategory
 * @param body
 * @return {Promise<T>}
 */
const create = async function(body) {
    let categories_info = {};
    categories_info.status = 'create category';

    if(!body) TE('Needs data for create category');
    return Category.create(
        body
    ).then((data) => {return data}).catch(err => TE(err.message))
};
module.exports.create = create;
/**
 * Update category
 * @method update
 * @param body
 * @return {Promise<T>}
 */
const update = async function(body) {
    let categories_info = {};
    categories_info.status = 'update category';

    if(!body) TE('Needs data for update category');
    if(!body.category_id) TE('Needs category_id for update category');
    let where = {category_id: body.category_id};
    return Category.update(
        body,
        {where: {category_id: body.category_id}}
    ).then(() => {return Category.findOne({
        where: where
    }).then((data) => {return data}).catch(err => TE(err.message))}).catch(err => TE(err.message))
};

module.exports.update = update;
