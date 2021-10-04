/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}triggers`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.changeColumn(table, 'src', Sequelize.STRING(128), { transaction });
        });
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.changeColumn(table, 'dest', Sequelize.STRING(128), { transaction });
        });
    }
};
