'use strict';

module.exports = {
    development: {
        url: process.env.DATASTORE_SEQUELIZE_URL,
        logging: true
    },
    test: {
        url: process.env.TEST_DATASTORE_SEQUELIZE_URL,
        logging: true
    },
    production: {
        url: process.env.DATASTORE_SEQUELIZE_URL,
        logging: true
    }
};
