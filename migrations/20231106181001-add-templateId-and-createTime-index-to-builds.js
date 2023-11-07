/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}builds`;

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.removeIndex(table, `${table}_template_Id`, { transaction });

            await queryInterface.addIndex(table, {
                name: `${table}_templateId_createTime`,
                fields: ['templateId', 'createTime'],
                transaction
            });
        });
    }
};
