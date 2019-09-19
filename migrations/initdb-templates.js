/* eslint-disable new-cap */

'use strict';

const owner = process.env.DATASTORE_SEQUELIZE_OWNER;
const schema = process.env.DATASTORE_SEQUELIZE_SCHEMA || 'public';
const lockTimeout = process.env.DATASTORE_SEQUELIZE_LOCKTIMEOUT || '2s';
const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}templates`;

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
                labels: {
                    type: Sequelize.TEXT
                },
                config: {
                    type: Sequelize.TEXT
                },
                name: {
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
                pipelineId: {
                    type: Sequelize.DOUBLE
                },
                namespace: {
                    type: Sequelize.STRING(64)
                },
                images: {
                    type: Sequelize.TEXT
                },
                createTime: {
                    type: Sequelize.STRING(32)
                },
                trusted: {
                    type: Sequelize.BOOLEAN
                }
            },
            {
                schema: `${schema}`
            }, { transaction }
            );

            await queryInterface.addConstraint(table, ['name', 'version', 'namespace'],
                {
                    name: `${table}_namespace_name_version_key`,
                    type: 'unique',
                    transaction
                }
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
