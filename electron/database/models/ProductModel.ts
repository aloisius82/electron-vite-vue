import { Sequelize, Model, DataTypes } from "sequelize";

const ProductModel = (sequelize:Sequelize)=>{
    class Product extends Model {}
    Product.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          barcode: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
          },
          price:{
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0
          },
          qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
          },
    }, { sequelize, modelName: "Product", tableName: "products", timestamps: false }
    )
    return Product
}

export default ProductModel