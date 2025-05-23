'use strict';

const prefix = process.env.DATASTORE_SEQUELIZE_PREFIX || '';
const table = `${prefix}pipelines`;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.transaction(async transaction => {
            await queryInterface.addColumn(
                table,
                'adminUserIds',
                {
                    type: Sequelize.TEXT,
                    defaultValue: '[]',
                    allowNull: false
                },
                { transaction }
            );
        });
    }
};
