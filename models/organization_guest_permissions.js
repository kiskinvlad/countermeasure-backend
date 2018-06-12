module.exports = (sequelize, Sequelize) => {

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

    Organization_guest_permissions.prototype.toWeb = function () {
        return this.toJSON();
    };

    return Organization_guest_permissions;
};
