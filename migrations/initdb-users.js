/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}users`;

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
                username: {
                    type: Sequelize.STRING(128)
                },
                token: {
                    type: Sequelize.TEXT
                },
                scmContext: {
                    type: Sequelize.STRING(128)
                }
            }, { transaction }
            );

            await queryInterface.addConstraint(table, ['username', 'scmContext'],
                {
                    name: `${table}_username_scmContext_key`,
                    type: 'unique',
                    transaction
                }
            );

            await queryInterface.addIndex(table, ['scmContext'],
                {
                    name: `${table}_scm_context`,
                    transaction
                }
            );

            await queryInterface.addIndex(table, ['username'],
                {
                    name: `${table}_username`,
                    transaction
                }
            );
        });
    },
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => queryInterface.dropTable(table)
};
