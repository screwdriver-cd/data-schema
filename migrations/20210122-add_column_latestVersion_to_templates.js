/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}templates`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.addColumn(table, 'latest', {
                type: Sequelize.BOOLEAN }, { transaction });
            // eslint-disable-next-line max-len
            await queryInterface.sequelize.query(`UPDATE "${table}" SET latest = true WHERE id in (SELECT max(id) FROM (SELECT * FROM "${table}") AS tmpl GROUP BY namespace, name)`);
        });
    }
};
