/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}jobs`;

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
                    name: {
                        type: Sequelize.STRING(110)
                    },
                    permutations: {
                        type: Sequelize.TEXT
                    },
                    description: {
                        type: Sequelize.STRING(100)
                    },
                    pipelineId: {
                        type: Sequelize.DOUBLE
                    },
                    state: {
                        type: Sequelize.STRING(10)
                    },
                    archived: {
                        type: Sequelize.BOOLEAN
                    },
                    prParentJobId: {
                        type: Sequelize.DOUBLE
                    },
                    stateChanger: {
                        type: Sequelize.STRING(128)
                    },
                    stateChangeTime: {
                        type: Sequelize.TEXT
                    },
                    stateChangeMessage: {
                        type: Sequelize.STRING(512)
                    }
                },
                { transaction }
            );

            await queryInterface.addConstraint(table, {
                name: `${table}_name_pipelineId_key`,
                fields: ['name', 'pipelineId'],
                type: 'unique',
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_pipeline_id_state`,
                fields: ['pipelineId', 'state'],
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_state`,
                fields: ['state'],
                transaction
            });
        });
    }
};
