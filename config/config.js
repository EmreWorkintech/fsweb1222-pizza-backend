const PORT = process.env.PORT || 9000;
const NODE_ENV = process.env.NODE_ENV || 'testing';
const HASH_ROUND = 10;
const JWT_SECRET = process.env.JWT_SECRET || "hello mello"

module.exports = {
    PORT,
    NODE_ENV,
    HASH_ROUND,
    JWT_SECRET
}