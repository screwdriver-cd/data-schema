/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}pipelines`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.addColumn(
                table,
                'stateChanger',
                {
                    type: Sequelize.STRING(128)
                },
                { transaction }
            );
            await queryInterface.addColumn(
                table,
                'stateChangeTime',
                {
                    type: Sequelize.STRING(32)
                },
                { transaction }
            );
            await queryInterface.addColumn(
                table,
                'stateChangeMessage',
                {
                    type: Sequelize.STRING(512)
                },
                { transaction }
            );
        });
    }
};
