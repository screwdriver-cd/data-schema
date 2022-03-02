/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}templates`;

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
                { transaction }
            );

            await queryInterface.addConstraint(table, {
                name: `${table}_namespace_name_version_key`,
                fields: ['name', 'version', 'namespace'],
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
