/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}templateTags`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.addColumn(
                table,
                'templateType',
                {
                    type: Sequelize.STRING(16),
                    defaultValue: 'JOB',
                    allowNull: false
                },
                { transaction }
            );
        });
    }
};
