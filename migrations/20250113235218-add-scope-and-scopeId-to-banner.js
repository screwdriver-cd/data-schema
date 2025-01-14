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
                    type: Sequelize.STRING(15)
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
        });
    }
};
