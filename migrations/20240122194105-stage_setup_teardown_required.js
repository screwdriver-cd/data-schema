/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}stages`;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.changeColumn(
                table,
                'setup',
                {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                { transaction }
            );
            await queryInterface.changeColumn(
                table,
                'teardown',
                {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                { transaction }
            );
        });
    }
};
