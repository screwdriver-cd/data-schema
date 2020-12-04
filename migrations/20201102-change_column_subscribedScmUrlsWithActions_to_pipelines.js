/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}pipelines`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.removeIndex(
                table,
                `${table}_subscribed_scm_urls_with_actions`,
                { transaction }
            );

            await queryInterface.changeColumn(table, 'subscribedScmUrlsWithActions', {
                type: Sequelize.TEXT('medium') }, { transaction });

            await queryInterface.addIndex(
                table,
                [{ attribute: 'subscribedScmUrlsWithActions', length: 128 }],
                {
                    name: `${table}_subscribed_scm_urls_with_actions`,
                    transaction
                });
        });
    }
};
