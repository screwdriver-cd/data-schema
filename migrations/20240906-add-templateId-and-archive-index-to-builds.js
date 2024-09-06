/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}jobs`;

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.removeIndex(table, `${table}_templateId`, { transaction });

            await queryInterface.addIndex(table, {
                name: `${table}_templateId_archived`,
                fields: ['templateId', 'archived'],
                transaction
            });
        });
    },
    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.removeIndex(table, `${table}_templateId_archived`, { transaction });

            await queryInterface.addIndex(table, {
                name: `${table}_templateId`,
                fields: ['templateId'],
                transaction
            });
        });
    }
};
