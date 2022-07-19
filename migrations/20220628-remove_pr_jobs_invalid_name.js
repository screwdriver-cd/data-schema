'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}jobs`;

module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.transaction(async transaction => {
            const dialect = queryInterface.sequelize.getDialect();
            // sqlite
            let query = `DELETE FROM "${table}" WHERE "name" LIKE 'PR-%' AND INSTR(name, ':') = 0`;

            if (dialect === 'postgres') {
                query = `DELETE FROM "${table}" WHERE "name" LIKE 'PR-%' AND POSITION(':' IN "name") = 0`;
            } else if (dialect === 'mysql') {
                query = `DELETE FROM \`${table}\` WHERE name LIKE 'PR-%' AND POSITION(':' IN name) = 0`;
            }

            await queryInterface.sequelize.query(query, { transaction });
        });
    }
};
