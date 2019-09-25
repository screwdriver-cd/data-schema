/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}steps`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.createTable(table, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
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
            }, { transaction }
            );

            await queryInterface.addConstraint(table, ['buildId', 'name'],
                {
                    name: `${table}_buildId_name_key`,
                    type: 'unique',
                    transaction
                }
            );

            await queryInterface.addIndex(table, ['buildId'],
                {
                    name: `${table}_build_id`,
                    transaction
                }
            );

            await queryInterface.addIndex(table, ['name'],
                {
                    name: `${table}_name`,
                    transaction
                }
            );
        });
    },
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => queryInterface.dropTable(table)
};
