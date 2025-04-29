/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}events`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.addColumn(
                table,
                'status',
                {
                    type: Sequelize.STRING(10),
                    defaultValue: 'UNKNOWN',
                    allowNull: false
                },
                { transaction }
            );

            await queryInterface.removeIndex(table, `${table}_create_time_pipeline_id`, { transaction });

            await queryInterface.addIndex(table, {
                name: `${table}_create_time_pipeline_id_status`,
                fields: ['createTime', 'pipelineId', 'status'],
                transaction
            });
        });
    }
};
