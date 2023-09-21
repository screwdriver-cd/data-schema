'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const stagesTable = `${prefix}stages`;
const stageBuildsTable = `${prefix}stageBuilds`;

module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.removeColumn(stagesTable, 'workflowGraph', { transaction });
            await queryInterface.removeColumn(stageBuildsTable, 'workflowGraph', { transaction });
        });
    }
};
