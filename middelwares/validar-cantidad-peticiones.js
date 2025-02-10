import rateLimit from "express-rate-limit";

const apilimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
})

export default apilimiter