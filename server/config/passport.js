import passport from 'passport';
import passportJWT from "passport-jwt";
import { User } from '../models/user.js';

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

export default function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.DATABASE_SECRET;
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.getUserById(jwt_payload.data._id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    }));
}