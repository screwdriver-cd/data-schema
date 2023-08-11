/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}stages`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.removeColumn(table, 'groupEventId', { transaction });

            await queryInterface.addConstraint(table, {
                fields: ['pipelineId', 'name'],
                name: `${table}_pipeline_id_name_key`,
                type: 'unique',
                transaction
            });

            await queryInterface.addColumn(
                table,
                'setup',
                {
                    type: Sequelize.INTEGER
                },
                { transaction }
            );
            await queryInterface.addColumn(
                table,
                'teardown',
                {
                    type: Sequelize.INTEGER
                },
                { transaction }
            );
            await queryInterface.addColumn(
                table,
                'archived',
                {
                    type: Sequelize.BOOLEAN
                },
                { transaction }
            );
        });
    }
};
