/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}stages`;

module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.dropTable(table, {
                transaction
            });

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
                    description: {
                        type: Sequelize.STRING(256)
                    },
                    setup: {
                        type: Sequelize.INTEGER
                    },
                    teardown: {
                        type: Sequelize.INTEGER
                    },
                    archived: {
                        type: Sequelize.BOOLEAN
                    },
                    workflowGraph: {
                        type: Sequelize.TEXT
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
                name: `${table}_pipeline_id`,
                fields: ['pipelineId'],
                transaction
            });

            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }
};
