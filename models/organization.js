module.exports = (sequelize, Sequelize) => {
    /**
     * Organization table data model
     * @module Organization
     * @property Organization model
     * @type {Model|void|*|{}}
     * @param org_id
     * @param org_name
     * @param first_name
     * @param last_name
     * @param phone
     * @param email
     * @param create_time
     * @param enabled
     * @param member_limit
     */
    const Organization = sequelize.define('ORGANIZATION', {
        org_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        org_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        first_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        last_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
            validate: { len: {args: [7, 20], msg: 'Phone number invalid, too short.'},
                isNumeric: { msg: 'not a valid phone number.'}
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
            validate: { isEmail: {msg: 'Email invalid.'} }
        },
        create_time: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        enabled: {
            type: Sequelize.INTEGER
        },
        member_limit: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        tableName: 'ORGANIZATION',
        timestamps: false
    });
    /**
     * Model associate method. Create organization table one to many association with case table.
     * @method Organization.associate
     * @param models
     */
    Organization.associate = function(models) {
        this.hasMany(models.CASE, {foreignKey: 'org_id', targetKey: 'org_id'});
    };

    return Organization;
};
