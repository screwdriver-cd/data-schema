/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}commands`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.createTable(table, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER.UNSIGNED
                },
                namespace: {
                    type: Sequelize.STRING(64)
                },
                version: {
                    type: Sequelize.STRING(16)
                },
                description: {
                    type: Sequelize.STRING(256)
                },
                maintainer: {
                    type: Sequelize.STRING(64)
                },
                format: {
                    type: Sequelize.STRING(16)
                },
                habitat: {
                    type: Sequelize.TEXT
                },
                docker: {
                    type: Sequelize.TEXT
                },
                binary: {
                    type: Sequelize.TEXT
                },
                name: {
                    type: Sequelize.STRING(64)
                },
                pipelineId: {
                    type: Sequelize.DOUBLE
                },
                createTime: {
                    type: Sequelize.STRING(32)
                },
                usage: {
                    type: Sequelize.STRING(4096)
                },
                trusted: {
                    type: Sequelize.BOOLEAN
                }
            }, { transaction }
            );

            await queryInterface.addIndex(table, ['name'],
                {
                    name: `${table}_name`,
                    transaction
                }
            );

            await queryInterface.addIndex(table, ['namespace'],
                {
                    name: `${table}_namespace`,
                    transaction
                }
            );
        });
    }
};
