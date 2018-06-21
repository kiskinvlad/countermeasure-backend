const Scenario = require('../models').SCENARIO;
const TE = require('../utils').TE;
const to = require('../utils').to;

const getScenarios = async function(limit, offset, where, order){
    let scenarios_info = {};
    scenarios_info.status = 'get scenarios';
    if(!where.case_id) TE('Needs case id');
    let scenarios, err;
    [err, scenarios] = await to(Scenario.findAll({
        limit: limit || null,
        offset: offset || null,
        where: where,
        order: order || null
    }));
    if(err) TE(err.message);
    if(!scenarios) TE('Cannot find scenarios');
    return scenarios;
};
module.exports.getScenarios = getScenarios;

const getLastScenario = async function() {
    let scenario, err;
    [err, scenario] = await to(Scenario.findAll({
        limit: 1,
        order: [ [ 'order_position', 'DESC' ]]
    }));
    if(err) TE(err.message);
    return scenario;
};
module.exports.getLastScenario = getLastScenario;

const moveScenarios = async function(firstScenario, secondScenario){
    let scenarios_info = {};
    scenarios_info.status = 'move scenarios';

    if(!firstScenario.id) TE('Needs first scenario id');
    if(!secondScenario.id) TE('Needs second scenario id');
    return Scenario.update(
        {order_position: secondScenario.order_position},
        {where: {scenario_id: firstScenario.id}})
        .then(() => {
            return Scenario.update(
                {order_position: firstScenario.order_position},
                {where: {scenario_id: secondScenario.id}}
            ).then(() => {return {status: 'success'}}).catch(err => TE(err.message))
        }).catch(err => TE(err.message));
};
module.exports.moveScenarios = moveScenarios;

const deleteScenario = async function(id) {
    let categories_info = {};
    categories_info.status = 'delete scenario';

    if(!id) TE('Needs scenario id');
    return Scenario.destroy(
        {where: {scenario_id: id}}
    ).then(() => {return {status: 'success'}}).catch(err => TE(err.message))
};
module.exports.deleteScenario = deleteScenario;

const getScenario = async function(id) {
    let scenarios_info = {};
    let where = {scenario_id: id};
    scenarios_info.status = 'get scenario';

    if(!id) TE('Needs scenario id');
    return Scenario.findOne({
        where: where
    }).then((data) => {return data}).catch(err => TE(err.message))
};
module.exports.getScenario = getScenario;

const create = async function(body) {
    let scenarios_info = {};
    scenarios_info.status = 'create scenario';

    if(!body) TE('Needs data for create scenario');
    return Scenario.create(
        body
    ).then((data) => {return data}).catch(err => TE(err.message))
};
module.exports.create = create;

const update = async function(body) {
    let scenarios_info = {};
    scenarios_info.status = 'update scenario';

    if(!body) TE('Needs data for update scenario');
    if(!body.scenario_id) TE('Needs category_id for update scenario');
    let where = {scenario_id: body.scenario_id};
    return Scenario.update(
        body,
        {where: {scenario_id: body.scenario_id}}
    ).then(() => {return Scenario.findOne({
        where: where
    }).then((data) => {return data}).catch(err => TE(err.message))}).catch(err => TE(err.message))
};

module.exports.update = update;
