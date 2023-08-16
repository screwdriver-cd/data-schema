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
                        type: Sequelize.DOUBLE,
                        allowNull: false
                    },
                    namespace: {
                        type: Sequelize.STRING(64),
                        allowNull: false
                    },
                    name: {
                        type: Sequelize.STRING(64),
                        allowNull: false
                    },
                    maintainer: {
                        type: Sequelize.STRING(64),
                        allowNull: false
                    },
                    trustedSinceVersion: {
                        type: Sequelize.STRING(16)
                    },
                    latestVersion: {
                        type: Sequelize.STRING(16)
                    },
                    createTime: {
                        type: Sequelize.STRING(32),
                        allowNull: false
                    },
                    updateTime: {
                        type: Sequelize.STRING(32),
                        allowNull: false
                    },
                    templateType: {
                        type: Sequelize.STRING(16),
                        allowNull: false
                    }
                },
                { transaction }
            );

            await queryInterface.addConstraint(table, {
                name: `${table}_namespace_name_key`,
                fields: ['name', 'namespace', 'templateType'],
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
