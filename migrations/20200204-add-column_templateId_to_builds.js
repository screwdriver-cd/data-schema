/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}builds`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.addColumn(
                table,
                'templateId',
                {
                    type: Sequelize.INTEGER
                },
                { transaction }
            );

            await queryInterface.addIndex(table, ['templateId'], {
                name: `${table}_template_id`,
                transaction
            });
        });
    }
};
