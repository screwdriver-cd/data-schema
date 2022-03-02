/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}secrets`;

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
                    pipelineId: {
                        type: Sequelize.DOUBLE
                    },
                    name: {
                        type: Sequelize.STRING(64)
                    },
                    value: {
                        type: Sequelize.TEXT
                    },
                    allowInPR: {
                        type: Sequelize.BOOLEAN
                    }
                },
                { transaction }
            );

            await queryInterface.addConstraint(table, {
                name: `${table}_pipelineId_name_key`,
                fields: ['pipelineId', 'name'],
                type: 'unique',
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_pipeline_id`,
                fields: ['pipelineId'],
                transaction
            });
        });
    }
};
