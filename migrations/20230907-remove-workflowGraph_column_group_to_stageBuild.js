'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}stageBuilds`;

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.removeColumn(table, 'workflowGraph');
            // eslint-disable-next-line no-empty
        } catch (e) {}
    }
};
