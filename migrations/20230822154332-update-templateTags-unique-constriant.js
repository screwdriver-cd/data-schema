'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}templateTags`;

module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.removeConstraint(table, `${table}_namespace_name_tag_key`, { transaction });

            await queryInterface.addConstraint(table, {
                name: `${table}_namespace_name_tag_templateType_key`,
                fields: ['name', 'tag', 'namespace', 'templateType'],
                type: 'unique',
                transaction
            });
        });
    }
};
