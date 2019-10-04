/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}commandTags`;

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
        });
    }
};
