module.exports = (sequelize, Sequelize) => {
    /**
     * Case table data model
     * @module Case
     * @property Case model
     * @type {Model|void|*|{}}
     * @param case_id
     * @param org_id
     * @param matter_id
     * @param name
     * @param description
     * @param updated_at
     * @param updated_by_name
     * @param updated_by_id
     */
    const Case = sequelize.define('CASE', {
        case_id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        org_id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        matter_id: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_by_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        updated_by_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'USER',
                key: 'user_id'
            }
        },
    }, {
        freezeTableName: true,
        tableName: 'CASE',
        timestamps: false
    });
    /**
     * Model associate method. Create case table one to many association with disputed_t1_ta table.
     * @method Case.associate
     * @param models
     */
    Case.associate = function(models) {
        this.hasMany(models.DISPUTED_T1_TA, {foreignKey: 'case_id', targetKey: 'case_id'});
    };

    return Case;
};
