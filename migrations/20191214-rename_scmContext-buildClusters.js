/* eslint-disable new-cap */

'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}buildClusters`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.sequelize.query('SET SQL_MODE = CONCAT(@@SQL_MODE, ' +
                '\',ANSI_QUOTES,PIPES_AS_CONCAT\')');
            // eslint-disable-next-line no-empty
        } catch (e) {}

        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.changeColumn(table, 'scmContext', Sequelize.TEXT('medium'),
                { transaction });
            await queryInterface.renameColumn(table, 'scmContext', 'scmContexts',
                { transaction });
            await queryInterface.sequelize.query(`UPDATE "${table}"
                SET "scmContexts" = '["' ||  "scmContexts" || '"]' `,
            { transaction });
        });

        try {
            await queryInterface.sequelize.query('SET SQL_MODE = REPLACE(@@SQL_MODE, ' +
                '\'ANSI_QUOTES\', \'\')');
            // eslint-disable-next-line no-empty
        } catch (e) {}

        try {
            await queryInterface.sequelize.query('SET SQL_MODE = REPLACE(@@SQL_MODE, ' +
                '\'PIPES_AS_CONCAT\', \'\')');
            // eslint-disable-next-line no-empty
        } catch (e) {}
    }
};
