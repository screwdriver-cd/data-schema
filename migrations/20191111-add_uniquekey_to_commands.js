/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}commands`;

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.removeConstraint(table, `${table}_namespace_version_name_key`);
            // eslint-disable-next-line no-empty
        } catch (e) {}
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.addConstraint(table, ['namespace', 'version', 'name'],
                {
                    name: `${table}_namespace_version_name_key`,
                    type: 'unique',
                    transaction
                }
            );
        });
    }
};
