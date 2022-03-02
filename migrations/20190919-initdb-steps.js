/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}steps`;

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
                    buildId: {
                        type: Sequelize.DOUBLE
                    },
                    name: {
                        type: Sequelize.STRING(64)
                    },
                    command: {
                        type: Sequelize.TEXT
                    },
                    code: {
                        type: Sequelize.DOUBLE
                    },
                    startTime: {
                        type: Sequelize.TEXT
                    },
                    endTime: {
                        type: Sequelize.TEXT
                    },
                    lines: {
                        type: Sequelize.DOUBLE
                    }
                },
                { transaction }
            );

            await queryInterface.addConstraint(table, {
                name: `${table}_buildId_name_key`,
                fields: ['buildId', 'name'],
                type: 'unique',
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_build_id`,
                fields: ['buildId'],
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_name`,
                fields: ['name'],
                transaction
            });
        });
    }
};
