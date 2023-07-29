/* eslint-disable new-cap */

'use strict';

/** @type {import('sequelize-cli').Migration} */
const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}pipelineTemplateVersions`;

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
                    templateId: {
                        type: Sequelize.DOUBLE,
                        allowNull: false
                    },
                    description: {
                        type: Sequelize.STRING(256)
                    },
                    version: {
                        type: Sequelize.STRING(16),
                        allowNull: false
                    },
                    config: {
                        type: Sequelize.TEXT,
                        allowNull: false
                    },
                    createTime: {
                        type: Sequelize.STRING(32),
                        allowNull: false
                    }
                },
                { transaction }
            );

            await queryInterface.addConstraint(table, {
                name: `${table}_templateId_version_key`,
                fields: ['templateId', 'version'],
                type: 'unique',
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_templateId`,
                fields: ['templateId'],
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_version`,
                fields: ['version'],
                transaction
            });
        });
    }
};
