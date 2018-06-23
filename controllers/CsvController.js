const jsonexport = require('jsonexport');

const ReE = require('../utils').ReE;
/**
 * Create comma separated values table
 * @method createCvs
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const createCvs = async function (req, res) {
    const json_data = req.body;
    jsonexport(json_data, function(err, csv){
        if(err) return ReE( res, err, 422 );
        res.set({
            'Content-Length': csv.size,
            'Content-Disposition': 'attachment; filename=out.csv',
            'Content-Type': 'text/csv'
        });
        res.send(csv);
    });
};

module.exports = {
    createCvs
};