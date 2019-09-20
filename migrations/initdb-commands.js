/* eslint-disable new-cap */

'use strict';

const owner = process.env.DATASTORE_SEQUELIZE_OWNER || 'postgres';
const schema = process.env.DATASTORE_SEQUELIZE_SCHEMA || 'public';
const lockTimeout = process.env.DATASTORE_SEQUELIZE_LOCKTIMEOUT || '2s';
const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}commands`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.sequelize.query(
                `SET lock_timeout TO '${lockTimeout}';`, { transaction });
            await queryInterface.sequelize.query(
                `SET ROLE TO ${owner};`, { transaction });

            await queryInterface.createTable(table, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
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
            },
            {
                schema: `${schema}`
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

            await queryInterface.sequelize.query(
                `alter table "${table}" owner to ${owner};`, { transaction }
            );
        });
    },
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => queryInterface.dropTable(table)
};
