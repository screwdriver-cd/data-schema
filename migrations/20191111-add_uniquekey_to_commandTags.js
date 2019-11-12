/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}commandTags`;

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.removeConstraint(table, `${table}_namespace_name_tag_key`);
            // eslint-disable-next-line no-empty
        } catch (e) {}
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.addConstraint(table, ['namespace', 'name', 'tag'],
                {
                    name: `${table}_namespace_name_tag_key`,
                    type: 'unique',
                    transaction
                }
            );
        });
    }
};
