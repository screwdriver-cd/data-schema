/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}stages`;

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
                    name: {
                        type: Sequelize.STRING(64)
                    },
                    jobIds: {
                        type: Sequelize.TEXT
                    },
                    state: {
                        type: Sequelize.STRING(10)
                    },
                    description: {
                        type: Sequelize.STRING(256)
                    },
                    color: {
                        type: Sequelize.STRING(10)
                    }
                },
                { transaction }
            );

            await queryInterface.addConstraint(table, {
                name: `${table}_pipeline_id_name_key`,
                fields: ['pipelineId', 'name'],
                type: 'unique',
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${prefix}_pipeline_id`,
                fields: ['pipelineId'],
                transaction
            });
        });
    }
};
