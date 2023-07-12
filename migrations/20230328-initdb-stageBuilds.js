/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}stageBuilds`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.createTable(
                table,
                {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER.UNSIGNED
                    },
                    stageId: {
                        type: Sequelize.DOUBLE
                    },
                    status: {
                        type: Sequelize.TEXT
                    },
                    eventId: {
                        type: Sequelize.DOUBLE
                    },
                    workflowGraph: {
                        type: Sequelize.TEXT
                    }
                },
                { transaction }
            );

            await queryInterface.addConstraint(table, {
                name: `${table}_stage_id_event_id_key`,
                fields: ['stageId', 'eventId'],
                type: 'unique',
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_stage_id`,
                fields: ['stageId'],
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_event_id`,
                fields: ['eventId'],
                transaction
            });
        });
    }
};
