/* eslint-disable new-cap */

'use strict';

const owner = process.env.DATASTORE_SEQUELIZE_OWNER || 'postgres';
const schema = process.env.DATASTORE_SEQUELIZE_SCHEMA || 'public';
const lockTimeout = process.env.DATASTORE_SEQUELIZE_LOCKTIMEOUT || '2s';
const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}secrets`;

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
            {
                schema: `${schema}`
            }, { transaction }
            );

            await queryInterface.addConstraint(table, ['pipelineId', 'name'],
                {
                    name: `${table}_pipelineId_name_key`,
                    type: 'unique',
                    transaction
                }
            );

            await queryInterface.addIndex(table, ['pipelineId'],
                {
                    name: `${table}_pipeline_id`,
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
