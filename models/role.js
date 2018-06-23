module.exports = (sequelize, Sequelize) => {
    /**
     * Role table data model
     * @module Role
     * @property Role model
     * @type {Model|void|*|{}}
     * @param role_id
     * @param role_name
     */
    const Role = sequelize.define('USER_ROLE', {
        role_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        role_name: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    }, {
        freezeTableName: true,
        tableName: 'USER_ROLE',
        timestamps: false
    });
    /**
     * Model associate method. Create role table one to many association with user table.
     * @method Role.associate
     * @param models
     */
    Role.associate = function(models) {
        this.hasMany(models.USER, {foreignKey: 'role_id', targetKey: 'role_id'});
    };
    /**
     * Convert model data to json format.
     * @method toWeb
     * @return JSON
     */
    Role.prototype.toWeb = function () {
        return this.toJSON();
    };

    return Role;
};
