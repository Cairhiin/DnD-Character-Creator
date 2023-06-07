import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/user.js';

export default function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = process.env.DATABASE_SECRET;
    passport.use(new Strategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.getUserById(jwt_payload._id);
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