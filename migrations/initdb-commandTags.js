/* eslint-disable new-cap */

'use strict';

const owner = process.env.DATASTORE_SEQUELIZE_OWNER;
const schema = process.env.DATASTORE_SEQUELIZE_SCHEMA || 'public';
const lockTimeout = process.env.DATASTORE_SEQUELIZE_LOCKTIMEOUT || '2s';
const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}commandTags`;

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
                namespace: {
                    type: Sequelize.STRING(64)
                },
                tag: {
                    type: Sequelize.STRING(30)
                },
                version: {
                    type: Sequelize.STRING(16)
                },
                name: {
                    type: Sequelize.STRING(64)
                },
                createTime: {
                    type: Sequelize.STRING(32)
                }
            },
            {
                schema: `${schema}`
            }, { transaction }
            );

            await queryInterface.addIndex(table, ['name'],
                {
                    name: `${prefix}command_tags_name`,
                    transaction
                }
            );

            await queryInterface.addIndex(table, ['namespace'],
                {
                    name: `${prefix}command_tags_namespace`,
                    transaction
                }
            );

            await queryInterface.addIndex(table, ['tag'],
                {
                    name: `${prefix}command_tags_tag`,
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
