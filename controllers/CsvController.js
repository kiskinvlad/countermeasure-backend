const jsonexport = require('jsonexport');
const CaseService = require('../services/CaseService');

const ReE = require('../utils').ReE;
/**
 * Create comma separated values table
 * @method createCvs
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const createCvs = async function (req, res) {
    const json_data = req.body.json;
    jsonexport(json_data, function(err, csv){
        if(err) return ReE( res, err, 422 );
        res.set({
            'Content-Length': csv.size,
            'Content-Disposition': 'attachment; filename=out.csv',
            'Content-Type': 'text/csv'
        });

        CaseService.getCase(req.body.case_id)
            .then(data => {
                res.send({data: csv, matter_id: data.matter_id});
            })
            .catch(error => {
                return ReE(res, err, 422);
            })
    });
};

module.exports = {
    createCvs
};