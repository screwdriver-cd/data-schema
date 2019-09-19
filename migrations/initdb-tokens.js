/* eslint-disable new-cap */

'use strict';

const owner = process.env.DATASTORE_SEQUELIZE_OWNER;
const schema = process.env.DATASTORE_SEQUELIZE_SCHEMA || 'public';
const lockTimeout = process.env.DATASTORE_SEQUELIZE_LOCKTIMEOUT || '2s';
const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}tokens`;

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
                hash: {
                    type: Sequelize.STRING(86)
                },
                userId: {
                    type: Sequelize.DOUBLE
                },
                name: {
                    type: Sequelize.STRING(128)
                },
                description: {
                    type: Sequelize.STRING(256)
                },
                lastUsed: {
                    type: Sequelize.TEXT
                },
                pipelineId: {
                    type: Sequelize.DOUBLE
                }
            },
            {
                schema: `${schema}`
            }, { transaction }
            );

            await queryInterface.addConstraint(table, ['hash'],
                {
                    name: `${table}_hash_key`,
                    type: 'unique',
                    transaction
                }
            );

            await queryInterface.addIndex(table, ['hash'],
                {
                    name: `${table}_hash`,
                    transaction
                }
            );

            await queryInterface.addIndex(table, ['pipelineId'],
                {
                    name: `${table}_pipeline_id`,
                    transaction
                }
            );

            await queryInterface.addIndex(table, ['userId'],
                {
                    name: `${table}_user_id`,
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
