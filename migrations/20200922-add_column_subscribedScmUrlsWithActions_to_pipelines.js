/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}pipelines`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.addColumn(table, 'subscribedScmUrlsWithActions', {
                type: Sequelize.INTEGER }, { transaction });

            await queryInterface.addIndex(table, ['subscribedScmUrlsWithActions'], {
                name: `${table}_subscribed_scm_urls_with_actions`, transaction });
        });
    }
};
