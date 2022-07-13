/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}stages`;

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            try {
                await queryInterface.removeColumn(table, 'color');

                await queryInterface.removeColumn(table, 'state');

                await queryInterface.addColumn(
                    table,
                    'groupEventId',
                    {
                        type: Sequelize.DOUBLE
                    },
                    { transaction }
                );

                await queryInterface.addColumn(
                    table,
                    'createTime',
                    {
                        type: Sequelize.STRING(32)
                    },
                    { transaction }
                );

                await queryInterface.addConstraint(table, {
                    name: `${table}_pipeline_id_name_group_event_id_key`,
                    fields: ['pipelineId', 'name', 'groupEventId'],
                    type: 'unique',
                    transaction
                });

                await queryInterface.addIndex(table, {
                    name: `${table}_group_event_id_create_time`,
                    fields: ['groupEventId', 'createTime'],
                    transaction
                });
                // eslint-disable-next-line no-empty
            } catch (e) {}
        });
    }
};
