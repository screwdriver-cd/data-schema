'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}pipelineTemplateVersions`;

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.addColumn(
                table,
                'workflowGraph',
                {
                    type: Sequelize.TEXT,
                    defaultValue: '{"nodes": [],"edges":[]}',
                    allowNull: false
                },
                { transaction }
            );
        });
    }
};
