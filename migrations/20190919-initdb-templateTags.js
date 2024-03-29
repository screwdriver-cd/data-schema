/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}templateTags`;

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
                    name: {
                        type: Sequelize.STRING(64)
                    },
                    tag: {
                        type: Sequelize.STRING(30)
                    },
                    version: {
                        type: Sequelize.STRING(16)
                    },
                    namespace: {
                        type: Sequelize.STRING(64)
                    },
                    createTime: {
                        type: Sequelize.STRING(32)
                    }
                },
                { transaction }
            );

            await queryInterface.addConstraint(table, {
                name: `${table}_namespace_name_tag_key`,
                fields: ['name', 'tag', 'namespace'],
                type: 'unique',
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${prefix}template_tags_name`,
                fields: ['name'],
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${prefix}template_tags_namespace`,
                fields: ['namespace'],
                transaction
            });

            await queryInterface.addIndex(table, {
                name: `${prefix}template_tags_tag`,
                fields: ['tag'],
                transaction
            });
        });
    }
};
