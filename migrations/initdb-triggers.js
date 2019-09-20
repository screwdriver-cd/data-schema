/* eslint-disable new-cap */

'use strict';

const owner = process.env.DATASTORE_SEQUELIZE_OWNER || 'postgres';
const schema = process.env.DATASTORE_SEQUELIZE_SCHEMA || 'public';
const lockTimeout = process.env.DATASTORE_SEQUELIZE_LOCKTIMEOUT || '2s';
const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}triggers`;

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
                src: {
                    type: Sequelize.STRING(64)
                },
                dest: {
                    type: Sequelize.STRING(64)
                }
            },
            {
                schema: `${schema}`
            }, { transaction }
            );

            await queryInterface.addConstraint(table, ['src', 'dest'],
                {
                    name: `${table}_src_dest_key`,
                    type: 'unique',
                    transaction
                }
            );

            await queryInterface.addIndex(table, ['dest', 'src'],
                {
                    name: `${table}_dest`,
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
