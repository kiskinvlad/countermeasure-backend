module.exports = (sequelize, Sequelize) => {
    /**
     * Organization_guest_permissions table data model
     * @module Organization_guest_permissions
     * @property Organization_guest_permissions model
     * @type {Model|void|*|{}}
     * @param org_id
     * @param user_id
     * @param case_id
     */
    const Organization_guest_permissions = sequelize.define('ORGANIZATION_GUEST_PERMISSIONS', {
        org_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'ORGANIZATION',
                key: 'org_id'
            }
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'USER',
                key: 'user_id'
            }
        },
        case_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'CASE',
                key: 'case_id'
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'ORGANIZATION_GUEST_PERMISSIONS',
        timestamps: false
    });
    /**
     * Convert model data to json format.
     * @method toWeb
     * @return JSON
     */
    Organization_guest_permissions.prototype.toWeb = function () {
        return this.toJSON();
    };

    return Organization_guest_permissions;
};
