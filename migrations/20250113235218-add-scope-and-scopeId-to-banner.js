/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}banners`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.addColumn(
                table,
                'scope',
                {
                    type: Sequelize.STRING(15),
                    defaultValue: 'GLOBAL',
                    allowNull: false
                },
                { transaction }
            );
            await queryInterface.addColumn(
                table,
                'scopeId',
                {
                    type: Sequelize.INTEGER.UNSIGNED
                },
                { transaction }
            );
            await queryInterface.addIndex(table, {
                name: `${table}_scope_and_scopeId`,
                fields: ['scope', 'scopeId'],
                transaction
            });
        });
    }
};
