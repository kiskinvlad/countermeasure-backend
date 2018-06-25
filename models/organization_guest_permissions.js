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
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        case_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'ORGANIZATION_GUEST_PERMISSIONS',
        timestamps: false
    });
    /**
     * Model associate method. Create Organization_guest_permissions table one
     * to many association with organization, user and case tables.
     * @method Organization_guest_permissions.associate
     * @param models
     */
    Organization_guest_permissions.associate = function (models) {
        this.belongsTo(models.ORGANIZATION, {foreignKey: 'org_id', targetKey: 'org_id'});
        this.belongsTo(models.USER, {foreignKey: 'user_id', targetKey: 'user_id'});
        this.belongsTo(models.CASE, {foreignKey: 'case_id', targetKey: 'case_id'});
    };
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
