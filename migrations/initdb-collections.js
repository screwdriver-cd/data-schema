/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}collections`;

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
                userId: {
                    type: Sequelize.DOUBLE
                },
                name: {
                    type: Sequelize.STRING(128)
                },
                description: {
                    type: Sequelize.STRING(256)
                },
                pipelineIds: {
                    type: Sequelize.TEXT
                },
                type: {
                    type: Sequelize.STRING(32)
                }
            }, { transaction }
            );

            await queryInterface.addIndex(table, ['userId'],
                {
                    name: `${table}_user_id`,
                    transaction
                }
            );
        });
    }
};
