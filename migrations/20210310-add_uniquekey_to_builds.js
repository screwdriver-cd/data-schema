/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}builds`;

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            const dialect = queryInterface.sequelize.getDialect();
            // eslint-disable-next-line max-len
            let query = `DELETE a FROM ${table} AS a, ${table} AS b WHERE a.id > b.id AND a.eventId = b.eventId AND a.jobId = b.jobId`;

            if (dialect === 'postgres') {
                // eslint-disable-next-line max-len
                query = `DELETE FROM "${table}" AS a USING "${table}" AS b WHERE a.id > b.id AND a."eventId" = b."eventId" AND a."jobId" = b."jobId"`;
            }

            await queryInterface.sequelize.query(query, { transaction });

            await queryInterface.addConstraint(table,
                {
                    name: `${table}_eventId_jobId_key`,
                    fields: ['eventId', 'jobId'],
                    type: 'unique',
                    transaction
                }
            );
        });
    }
};
