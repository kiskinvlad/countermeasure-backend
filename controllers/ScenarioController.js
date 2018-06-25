const ScenarioService = require('./../services/ScenarioService');

const Scenario = require('../models').SCENARIO;
const ReE = require('../utils').ReE;
const ReS = require('../utils').ReS;
const to = require('../utils').to;

const create = async function(req, res) {
    res.setHeader ( 'Content-Type', 'application/json' );
    const body = req.body;

    if(!body.case_id) {
        return ReE(res, 'Case id is not exist', 422);
    }
    if(body.name === null) {
        return ReE(res, 'Scenario name is not exist', 422);
    }
    if (!body.probability) {
        return ReE(res, 'Probability income value is not exist', 422);
    }
    if(!body.description) {
        return ReE(res, 'Description value is not exist', 422);
    }
    if(!body.taxes) {
        return ReE(res, 'Taxes value is not exist', 422);
    }
    if(!body.penalties) {
        return ReE(res, 'Penalties value is not exist', 422);
    }
    if(!body.interest) {
        return ReE(res, 'Interest value is not exist', 422);
    }
    else {
        let err, position;
        if(err) return ReE(res, err, 422);
        return ScenarioService.getLastScenario().then((scenario) => {
            if(scenario[0]) {
                position = scenario[0].order_position + 1;
            } else {
                position = 1;
            }
            body['order_position'] = position;
            return ScenarioService.create(body).then((scenario) => {
                return ReS(res, { message: 'Successfully created new scenario.', scenario: scenario.toWeb() }, 201);
            }).catch(err => { return ReE(res, err, 422) });
        }).catch(err => { return ReE(res, err, 422) });
    }
};

const getAllForCase = async function(req, res) {
    /**
     * @param {{filter_param:object}} filter_param
     * @param {{sort_param:object}} sort_param
     */
    const case_id = req.body.case_id || req.body.filter_param.id;
    const data = req.body;
    let err, scenarios, scenariosArray;
    let sort_param = data.sort_param,
        page_number = data.page_number,
        items_per_page = data.items_per_page;
    let filter_sql = { case_id: case_id }, sort_sql;
    if(sort_param) {
        sort_sql = [[sort_param.field]];
    }
    [err, scenarios] = await to(ScenarioService.getScenarios(
        items_per_page,
        items_per_page * (page_number - 1),
        filter_sql,
        sort_sql)
    );

    if(err) return ReE(res, err, 422);
    scenariosArray = JSON.parse(JSON.stringify(scenarios));
    [err, totalCount] = await to(
        Scenario.count({
            where: filter_sql
        })
    );

    return ReS(res, {page_number, items_per_page, totalCount, scenarios: scenariosArray});
};

const moveScenario = async function(req, res) {

    /**
     * @param {{first_scenario:object}} first_scenario
     * @param {{second_scenario:object}} second_scenario
     */
    const first_scenario = req.body.first_scenario;
    const second_scenario = req.body.second_scenario;

    ScenarioService.moveScenarios(
        first_scenario,
        second_scenario
    ).then(() => {
        getAllForCase(req, res).then(() => {
            console.log('Success get scenario')
        });
    }).catch(err => { return ReE(res, err, 422) });
};

const deleteScenarioForList = async function(req, res) {
    const scenario_id = req.body.scenario_id;

    ScenarioService.deleteScenario(
        scenario_id
    ).then(() => {
        getAllForCase(req, res).then(() => {
            console.log('Success get scenarios')
        });
    }).catch(err => { return ReE(res, err, 422) });
};

const get = async function(req, res) {
    const scenario_id = req.query.scenario_id;
    let scenario, err;
    [err, scenario] = await to(ScenarioService.getScenario(scenario_id));
    if (err) return ReE(res, err, 422);
    return ReS(res, {message: 'Successfully get scenario.', scenario: scenario.toWeb()}, 200);
};

const update = async function (req, res) {
    res.setHeader ( 'Content-Type', 'application/json' );
    const body = req.body;

    if(!body.scenario_id) {
        return ReE(res, 'Scenario id is not exist', 422);
    }
    if(!body.case_id) {
        return ReE(res, 'Case id is not exist', 422);
    }
    if(body.name === null) {
        return ReE(res, 'Scenario name is not exist', 422);
    }
    if (!body.probability) {
        return ReE(res, 'Probability income value is not exist', 422);
    }
    if(!body.description) {
        return ReE(res, 'Description value is not exist', 422);
    }
    if(!body.taxable_income) {
        return ReE
    }
    if(!body.taxes) {
        return ReE(res, 'Taxes value is not exist', 422);
    }
    if(!body.penalties) {
        return ReE(res, 'Penalties value is not exist', 422);
    }
    if(!body.interest) {
        return ReE(res, 'Interest value is not exist', 422);
    }
    else {
        let err, scenario;
        [err, scenario] = await to(ScenarioService.update(body));
        if (err) return ReE(res, err, 422);
        return ReS(res, {message: 'Successfully update scenario.', scenario: scenario.toWeb()}, 201);
    }
};

const remove = async function(req, res) {
    res.setHeader ( 'Content-Type', 'application/json' );
    let data, err, scenario;
    data = req.query;

    [err, scenario] = await to(ScenarioService.deleteScenario(data.id));
    if(err) return ReE( res, err, 422 );
    return ReS(res, { message: 'Successfully delete scenario.' }, 204);
};


module.exports = {
    get, update, create, remove, getAllForCase, moveScenario, deleteScenarioForList
};