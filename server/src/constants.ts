const __prod__ = process.env.NODE_ENV === 'production'
const COOKIE_NAME = process.env.COOKIE_NAME ?? "_pmid"
const SESSION_SECRET = process.env.SESSION_SECERET ?? '38cc647bc2c3cf6296687c6a8d25ca0adcec876f'
const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE ? Number(process.env.SESSION_MAX_AGE) : 30 * 24 * 60 * 60 * 1000 // default 30 days
const bycryptHashRounds = 10
const HOST = process.env.HOST && __prod__ ? process.env.HOST.endsWith('/') ? process.env.HOST : process.env.HOST + '/' : "http://localhost:4000/"
const ACCESS_TOKEN_SECRET = "my-jwt-secret-:)-|<"
const INVITATION_TOKEN_SECRET = "my-jwt-secret-:)-|<";
const RESET_PASSWORD_TOKEN_SECRET = "my-jwt-secret-:)-|<";
const VERIFY_ACCOUNT_TOKEN_SECRET = "my-jwt-secret-:)-|<";
export { __prod__, COOKIE_NAME, bycryptHashRounds, SESSION_SECRET, SESSION_MAX_AGE, HOST, ACCESS_TOKEN_SECRET, INVITATION_TOKEN_SECRET, RESET_PASSWORD_TOKEN_SECRET, VERIFY_ACCOUNT_TOKEN_SECRET }