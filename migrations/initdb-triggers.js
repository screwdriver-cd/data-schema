/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}triggers`;

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
                src: {
                    type: Sequelize.STRING(64)
                },
                dest: {
                    type: Sequelize.STRING(64)
                }
            }, { transaction }
            );

            await queryInterface.addConstraint(table, ['src', 'dest'],
                {
                    name: `${table}_src_dest_key`,
                    type: 'unique',
                    transaction
                }
            );

            await queryInterface.addIndex(table, [{ attribute: 'src', length: 64 }],
                {
                    name: `${table}_src`,
                    transaction
                }
            );

            await queryInterface.addIndex(table, [{ attribute: 'dest', length: 64 }],
                {
                    name: `${table}_dest`,
                    transaction
                }
            );
        });
    }
};
