/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}commands`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.addColumn(table, 'latestVersion', {
                type: Sequelize.BOOLEAN }, { transaction });
            // eslint-disable-next-line max-len
            await queryInterface.sequelize.query(`UPDATE ${table} SET trusted = true WHERE id in (SELECT max(id) FROM ${table} GROUP BY namespace, name)`);
        });
    }
};
