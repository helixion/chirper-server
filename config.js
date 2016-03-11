module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'localhost',
    MONGO_PORT: process.env.MONGO_PORT || '27017',
    MONGO_DB: 'chirper',
    PORT: process.env.PORT || '3000'
};