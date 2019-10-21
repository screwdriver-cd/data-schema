/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}builds`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.changeColumn(table, 'meta', Sequelize.TEXT('medium'),
                { transaction }
            );
        });

        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.changeColumn(table, 'parameters', Sequelize.TEXT('medium'),
                { transaction }
            );
        });
    }
};
