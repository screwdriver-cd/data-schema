/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}tokens`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.addColumn(
                table,
                'issuerId',
                {
                    type: Sequelize.DOUBLE
                },
                { transaction }
            );
            await queryInterface.addColumn(
                table,
                'expiresAt',
                {
                    type: Sequelize.STRING(32)
                },
                { transaction }
            );
            await queryInterface.addColumn(
                table,
                'options',
                {
                    type: Sequelize.TEXT('medium')
                },
                { transaction }
            );
        });
    }
};
