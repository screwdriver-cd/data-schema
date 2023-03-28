/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}stages`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            try {
                await queryInterface.removeColumn(table, 'groupEventId');

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
                    'startFrom',
                    {
                        type: Sequelize.STRING(110)
                    },
                    { transaction }
                );
                await queryInterface.removeConstraint(table, `${table}_pipeline_id_name_group_event_id_key`, { transaction });

                await queryInterface.addConstraint(table, {
                    fields: ['pipelineId', 'name'],
                    name: `${table}_pipeline_id_name_key`,
                    type: 'unique',
                    transaction
                });
                // eslint-disable-next-line no-empty
            } catch (e) {}
        });
    }
};
