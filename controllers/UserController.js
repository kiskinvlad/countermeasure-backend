const authService = require('./../services/AuthService');

const create = async function(req, res){
    res.setHeader ( 'Content-Type', 'application/json' );
    const body = req.body;

    if (!body.unique_key && !body.email) {
        return ReE(res, 'Please enter an email to register.');
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.');
    } else {
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, { message: 'Successfully created new user.', user: user.toWeb(), token: user.getJWT()}, 201);
    }
}

const get = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    return ReS(res, {user:user.toWeb()});
}

const update = async function (req, res) {
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if (err) {
        if (err.message == 'Validation error') 
            err = 'The email address or phone number is already in use';
        return ReE(res, err, 400);
    }
    return ReS(res, {message :'Updated User: ' + user.email, user:user.toWeb()});
}

const remove = async function(req, res) {
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if(err) return ReE( res, 'error occured trying to delete user' );

    return ReS(res, { message: 'Deleted User' }, 204);
}

const login = async function(req, res){
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if (err) return ReE(res, err, 422);

    const authToken = user.getJWT();

    const responseData = { token: authToken, user: user.toWeb() };
    res.header('access-control-expose-headers', "Authorization")
    res.header('Authorization', authToken);
    return ReS(res, responseData, 200)
}

module.exports = {
    create, get, update, remove, login
};