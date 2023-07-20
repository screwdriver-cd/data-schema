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
                        type: Sequelize.DOUBLE
                    },
                    description: {
                        type: Sequelize.STRING(256)
                    },
                    version: {
                        type: Sequelize.STRING(16)
                    },
                    config: {
                        type: Sequelize.TEXT
                    },
                    createTime: {
                        type: Sequelize.STRING(32)
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
        });
    }
};
