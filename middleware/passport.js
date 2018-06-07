const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models').USER;
const to = require('../utils').to;
const CONFIG = require('../config/config').CONFIG;
module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.jwt_encryption;

    passport.use(new JwtStrategy(opts, async function(jwt_payload, done){
        let err, user;

        [err, user] = await to(User.find({
            where: { 
                user_id: jwt_payload.user_id
            }
        }));

        if (err) return done(err, false);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
};