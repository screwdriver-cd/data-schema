/* eslint-disable new-cap */

'use strict';

/** @type {import('sequelize-cli').Migration} */
const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}templateMeta`;

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
                    pipelineId: {
                        type: Sequelize.DOUBLE
                    },
                    namespace: {
                        type: Sequelize.STRING(64)
                    },
                    name: {
                        type: Sequelize.STRING(64)
                    },
                    maintainer: {
                        type: Sequelize.STRING(64)
                    },
                    trustedSinceVersion: {
                        type: Sequelize.STRING(16)
                    },
                    latestVersion: {
                        type: Sequelize.STRING(16)
                    },
                    createTime: {
                        type: Sequelize.STRING(32)
                    },
                    updateTime: {
                        type: Sequelize.STRING(32)
                    }
                },
                { transaction }
            );

            await queryInterface.addConstraint(table, {
                name: `${table}_namespace_name_key`,
                fields: ['name', 'namespace'],
                type: 'unique',
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_name`,
                fields: ['name'],
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_namespace`,
                fields: ['namespace'],
                transaction
            });
        });
    }
};
