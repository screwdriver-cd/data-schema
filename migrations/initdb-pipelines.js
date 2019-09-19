/* eslint-disable new-cap */

'use strict';

const owner = process.env.DATASTORE_SEQUELIZE_OWNER;
const schema = process.env.DATASTORE_SEQUELIZE_SCHEMA || 'public';
const lockTimeout = process.env.DATASTORE_SEQUELIZE_LOCKTIMEOUT || '2s';
const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}pipelines`;

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
                scmUri: {
                    type: Sequelize.STRING(128)
                },
                scmRepo: {
                    type: Sequelize.TEXT
                },
                createTime: {
                    type: Sequelize.TEXT
                },
                admins: {
                    type: Sequelize.TEXT
                },
                annotations: {
                    type: Sequelize.TEXT
                },
                scmContext: {
                    type: Sequelize.STRING(128)
                },
                lastEventId: {
                    type: Sequelize.DOUBLE
                },
                workflowGraph: {
                    type: Sequelize.TEXT
                },
                configPipelineId: {
                    type: Sequelize.DOUBLE
                },
                childPipelines: {
                    type: Sequelize.TEXT
                },
                name: {
                    type: Sequelize.TEXT
                },
                prChain: {
                    type: Sequelize.BOOLEAN
                }
            },
            {
                schema: `${schema}`
            }, { transaction }
            );

            await queryInterface.addConstraint(table, ['scmUri'],
                {
                    name: `${table}_scmUri_key`,
                    type: 'unique',
                    transaction
                }
            );

            await queryInterface.addIndex(table, ['scmUri'],
                {
                    name: `${table}_scm_uri`,
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
