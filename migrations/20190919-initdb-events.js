/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}events`;

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
                    causeMessage: {
                        type: Sequelize.STRING(512)
                    },
                    commit: {
                        type: Sequelize.TEXT
                    },
                    createTime: {
                        type: Sequelize.STRING(32)
                    },
                    creator: {
                        type: Sequelize.TEXT
                    },
                    pipelineId: {
                        type: Sequelize.DOUBLE
                    },
                    sha: {
                        type: Sequelize.STRING(40)
                    },
                    type: {
                        type: Sequelize.STRING(10)
                    },
                    startFrom: {
                        type: Sequelize.TEXT
                    },
                    workflowGraph: {
                        type: Sequelize.TEXT
                    },
                    parentEventId: {
                        type: Sequelize.DOUBLE
                    },
                    meta: {
                        type: Sequelize.TEXT
                    },
                    pr: {
                        type: Sequelize.TEXT
                    },
                    configPipelineSha: {
                        type: Sequelize.STRING(40)
                    },
                    prNum: {
                        type: Sequelize.DOUBLE
                    }
                },
                { transaction }
            );

            await queryInterface.addConstraint(table, ['createTime', 'sha'], {
                name: `${table}_createTime_sha_key`,
                type: 'unique',
                transaction
            });

            await queryInterface.addIndex(table, ['createTime', 'pipelineId'], {
                name: `${table}_create_time_pipeline_id`,
                transaction
            });

            await queryInterface.addIndex(table, ['pipelineId'], {
                name: `${table}_pipeline_id`,
                transaction
            });

            await queryInterface.addIndex(table, ['type'], {
                name: `${table}_type`,
                transaction
            });
        });
    }
};
