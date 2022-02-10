/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}events`;

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.removeConstraint(table, `${table}_createTime_sha_key`, { transaction });

            await queryInterface.addConstraint(table, {
                fields: ['sha', 'createTime', 'pipelineId'],
                name: `${table}_createTime_sha_pid_key`,
                type: 'unique',
                transaction
            });
        });
    }
};
