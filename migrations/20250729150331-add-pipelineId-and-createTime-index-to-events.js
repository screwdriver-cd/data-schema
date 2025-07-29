/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}events`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.addIndex(table, {
                name: `${table}_pipeline_id_create_time`,
                fields: ['pipelineId', 'createTime'],
                transaction
            });
        });
    }
};
