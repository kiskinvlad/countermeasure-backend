const CategoryService = require('./../services/CategoryService');
const DisputedService = require('./../services/DisputedService');

const create = async function(req, res){
    res.setHeader ( 'Content-Type', 'application/json' );
    const body = req.body;

    switch (body) {
        case !body.case_id:
            return ReE(res, 'Category object must contain case id is not exist');
      //  case !body.disputed_t1_ta_id:
      //      return ReE(res, 'Personal income tax year in dispute id is not exist');
        case !body.name:
            return ReE(res, 'Category name is not exist');
        case !body.taxable_income:
            return ReE(res, 'Taxable income value is not exist');
        case !body.income_subject_to_gnp:
            return ReE(res, 'Income subject to GNP income value is not exist');
        case !body.other_amounts_payable:
            return ReE(res, 'Other amounts payable value is not exist');
        case !body.credits_applied_on_filing:
            return ReE(res, 'Credits applied on filing value is not exist');
        case !body.federal_non_refundable_tax_credits:
            return ReE(res, 'Non-refundable federal tax credits value is not exist');
        case !body.provincial_non_refundable_tax_credits:
            return ReE(res, 'Non-refundable provincial tax credits value is not exist');
        default:
            let err, category;
            [err, category] = await to(categoryService.createCategory(body));
            if(err) return ReE(res, err, 422);
            return ReS(res, { message: 'Successfully created new category.', category: category.toWeb() }, 201);
    }
}

const getAllForCase = async function(req, res) {
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
        sort_sql
        )
    );
    if(err) return ReE(res, err, 422);

    categoriesArray = JSON.parse(JSON.stringify(categories));
    for(var i=0; i < categoriesArray.length; i++) {
       disputed = await DisputedService.getDisputed(categoriesArray[i].disputed_t1_ta_id).then(data => {
           return data;
       }).catch(err => { return ReE(res, err, 422) });
       categoriesArray[i].disputed = {taxpayer: disputed.taxpayer, taxyear: disputed.year};
    }
    return ReS(res, {categories: categoriesArray});
}

const moveCategory = async function(req, res) {
    const first_category = req.body.first_category;
    const second_category = req.body.second_category;

    CategoryService.moveCategories(
        first_category,
        second_category
    ).then((data) => {
        getAllForCase(req, res);
    }).catch(err => { return ReE(res, err, 422) });
}

const deleteCategory = async function(req, res) {
    const category_id = req.body.category_id;
    CategoryService.deleteCategory(
        category_id
    ).then((data) => {
        getAllForCase(req, res);
    }).catch(err => { return ReE(res, err, 422) });
}

const update = async function (req, res) {
    let err, category, data
    category = req.category;
    data = req.body;
    category.set(data);

    [err, category] = await to(category.save());
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, {message :'Updated Category: '});
}

const remove = async function(req, res) {
    let category, err;
    category = req.category;

    [err, category] = await to(category.destroy());
    if(err) return ReE( res, 'error occured trying to delete category' );

    return ReS(res, { message: 'Deleted Category' }, 204);
}


module.exports = {
    create, getAllForCase, update, remove, moveCategory, deleteCategory
};