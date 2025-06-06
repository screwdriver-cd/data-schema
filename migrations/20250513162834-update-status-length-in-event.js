/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}events`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.changeColumn(
                table,
                'status',
                {
                    type: Sequelize.STRING(15),
                    defaultValue: 'UNKNOWN',
                    allowNull: false
                },
                { transaction }
            );
        });
    }
};
