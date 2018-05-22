module.exports = (sequelize, Sequelize) => {

    var Role = sequelize.define('USER_ROLE', {
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

    Role.associate = function(models) {
        this.hasMany(models.USER, {foreignKey: 'role_id', targetKey: 'role_id'});
    };

    Role.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Role;
};
