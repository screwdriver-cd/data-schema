/* eslint-disable new-cap */

'use strict';

const owner = process.env.DATASTORE_SEQUELIZE_OWNER;
const schema = process.env.DATASTORE_SEQUELIZE_SCHEMA || 'public';
const lockTimeout = process.env.DATASTORE_SEQUELIZE_LOCKTIMEOUT || '2s';
const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}buildClusters`;

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
                name: {
                    type: Sequelize.STRING(50)
                },
                description: {
                    type: Sequelize.STRING(100)
                },
                scmContext: {
                    type: Sequelize.STRING(128)
                },
                scmOrganizations: {
                    type: Sequelize.TEXT
                },
                isActive: {
                    type: Sequelize.BOOLEAN
                },
                managedByScrewdriver: {
                    type: Sequelize.BOOLEAN
                },
                maintainer: {
                    type: Sequelize.STRING(64)
                },
                weightage: {
                    type: Sequelize.DOUBLE
                }
            },
            {
                schema: `${schema}`
            }, { transaction }
            );

            await queryInterface.addConstraint(table, ['name'],
                {
                    name: `${table}_name_key`,
                    type: 'unique',
                    transaction
                }
            );

            await queryInterface.addIndex(table, ['name'],
                {
                    name: `${prefix}build_clusters_name`,
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
