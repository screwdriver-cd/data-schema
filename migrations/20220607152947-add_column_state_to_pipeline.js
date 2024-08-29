/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}pipelines`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.addColumn(
                table,
                'state',
                {
                    type: Sequelize.STRING(10),
                    defaultValue: 'ACTIVE',
                    allowNull: false
                },
                { transaction }
            );
        });
    }
};
