import passport from "passport";
import {Strategy: GoogleStrategy} from "passport-google-oauth20"
passport.use(new GoogleStrategy({
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL:process.env.GOOGLE_CALLBACK_URL
},
 async (accessToken,refreshToken,profile,done)=>{
 
 }
))