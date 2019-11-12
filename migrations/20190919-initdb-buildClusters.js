/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}buildClusters`;

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
        });
    }
};
