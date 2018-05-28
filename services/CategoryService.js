const Category = require('../models').CATEGORY;

const getCategories = async function(limit, offset, where, order){
    let categories_info = {};
    categories_info.status = 'get categories';

    if(!where.case_id) TE('Needs case id');
    let categories;
    [err, categories] = await to(Category.findAll({
        limit: limit,
        offset: offset,
        where: where,
        order: order
    }));
    if(err) TE(err.message);
    if(!categories) TE('Cannot find categories');

    return categories;
}

module.exports.getCategories = getCategories;

const moveCategories = async function(firstCategory, secondCategory){
    let categories_info = {};
    categories_info.status = 'move categories';

    if(!firstCategory.id) TE('Needs first category id');
    if(!secondCategory.id) TE('Needs second category id');
    return Category.update(
        {order_position: secondCategory.order_position},
        {where: {category_id: firstCategory.id}}).then(() => {
            return Category.update(
                {order_position: firstCategory.order_position},
                {where: {category_id: secondCategory.id}}
            ).then(() => {return {status: 'success'}}).catch(err => TE(err.message))
        }).catch(err => TE(err.message));
}

module.exports.moveCategories = moveCategories;

const deleteCategory = async function(id) {
    let categories_info = {};
    categories_info.status = 'delete category';

    if(!id) TE('Needs category id');
    return Category.destroy(
        {where: {category_id: id}}
    ).then(() => {return {status: 'success'}}).catch(err => TE(err.message))
}

module.exports.deleteCategory = deleteCategory;
