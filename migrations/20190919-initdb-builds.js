/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}builds`;

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
                    environment: {
                        type: Sequelize.TEXT
                    },
                    eventId: {
                        type: Sequelize.DOUBLE
                    },
                    jobId: {
                        type: Sequelize.DOUBLE
                    },
                    parentBuildId: {
                        type: Sequelize.TEXT
                    },
                    number: {
                        type: Sequelize.DOUBLE
                    },
                    container: {
                        type: Sequelize.TEXT
                    },
                    cause: {
                        type: Sequelize.TEXT
                    },
                    sha: {
                        type: Sequelize.TEXT
                    },
                    commit: {
                        type: Sequelize.TEXT
                    },
                    createTime: {
                        type: Sequelize.STRING(32)
                    },
                    startTime: {
                        type: Sequelize.TEXT
                    },
                    endTime: {
                        type: Sequelize.TEXT
                    },
                    parameters: {
                        type: Sequelize.TEXT
                    },
                    meta: {
                        type: Sequelize.TEXT
                    },
                    steps: {
                        type: Sequelize.TEXT
                    },
                    status: {
                        type: Sequelize.TEXT
                    },
                    statusMessage: {
                        type: Sequelize.TEXT
                    },
                    buildClusterName: {
                        type: Sequelize.STRING(50)
                    },
                    stats: {
                        type: Sequelize.TEXT
                    }
                },
                { transaction }
            );

            await queryInterface.addConstraint(table, {
                name: `${table}_jobId_number_key`,
                fields: ['jobId', 'number'],
                type: 'unique',
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_event_id_create_time`,
                fields: ['eventId', 'createTime'],
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_job_id`,
                fields: ['jobId'],
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_parent_build_id`,
                fields: [{ attribute: 'parentBuildId', length: 32 }],
                transaction
            });
        });
    }
};
