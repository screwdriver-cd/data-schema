/* eslint-disable new-cap */

'use strict';

const owner = process.env.DATASTORE_SEQUELIZE_OWNER || 'postgres';
const schema = process.env.DATASTORE_SEQUELIZE_SCHEMA || 'public';
const lockTimeout = process.env.DATASTORE_SEQUELIZE_LOCKTIMEOUT || '2s';
const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}banners`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.sequelize.query(
                `SET lock_timeout TO '${lockTimeout}';`, { transaction });
            await queryInterface.sequelize.query(
                `SET ROLE TO ${owner};`, { transaction });

            await queryInterface.createTable(table, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                message: {
                    type: Sequelize.STRING(512)
                },
                isActive: {
                    type: Sequelize.BOOLEAN
                },
                createTime: {
                    type: Sequelize.STRING(32)
                },
                createdBy: {
                    type: Sequelize.STRING(128)
                },
                type: {
                    type: Sequelize.STRING(32)
                }
            },
            {
                schema: `${schema}`
            }, { transaction }
            );

            await queryInterface.addConstraint(table, ['message', 'createTime', 'type'],
                {
                    name: `${table}_message_createTime_type_key`,
                    type: 'unique',
                    transaction
                }
            );

            await queryInterface.sequelize.query(
                `alter table "${table}" owner to ${owner};`, { transaction }
            );
        });
    },
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => queryInterface.dropTable(table)
};
