/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}triggers`;

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
                    src: {
                        type: Sequelize.STRING(64)
                    },
                    dest: {
                        type: Sequelize.STRING(64)
                    }
                },
                { transaction }
            );

            await queryInterface.addConstraint(table, {
                name: `${table}_src_dest_key`,
                fields: ['src', 'dest'],
                type: 'unique',
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_src`,
                fields: ['src'],
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${table}_dest`,
                fields: ['dest'],
                transaction
            });
        });
    }
};
