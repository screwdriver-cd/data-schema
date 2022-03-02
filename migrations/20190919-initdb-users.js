/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}users`;

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
                    username: {
                        type: Sequelize.STRING(128)
                    },
                    token: {
                        type: Sequelize.TEXT
                    },
                    scmContext: {
                        type: Sequelize.STRING(128)
                    }
                },
                { transaction }
            );

            await queryInterface.addConstraint(table, {
                name: `${table}_username_scmContext_key`,
                fields: ['username', 'scmContext'],
                type: 'unique',
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_scm_context`,
                fields: ['scmContext'],
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_username`,
                fields: ['username'],
                transaction
            });
        });
    }
};
