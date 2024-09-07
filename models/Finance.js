import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Finance = sequelize.define(
    'Finance',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        loan_amount: {
            type: DataTypes.DECIMAL(15,2),
            allowNull: false
        },
        
        intrest_rate: {
            type: DataTypes.DECIMAL(5,2),
            allowNull: false
        },

        loan_tenure_months: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        emi: {
            type: DataTypes.DECIMAL(15,2),
            allowNull: false
        },

        payment_amount: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: null
        },

        remaining_balance:{
            type: DataTypes.DECIMAL(15,2),
            allowNull: false
        }
    },
    {
      tableName: 'finance',
      timestamps: false
    }
)

export default Finance