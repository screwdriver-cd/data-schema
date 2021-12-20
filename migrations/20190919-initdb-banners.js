/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}banners`;

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
                { transaction }
            );

            await queryInterface.addConstraint(table, ['message', 'createTime', 'type'], {
                name: `${table}_message_createTime_type_key`,
                type: 'unique',
                transaction
            });
        });
    }
};
