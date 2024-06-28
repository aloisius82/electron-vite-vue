import { Sequelize, Model } from 'sequelize';
import { initDBHandler } from './Handler/index'

import ProductModel from './models/ProductModel';

enum DB_MODEL { PRODUCT }
enum DB_COMMAND {
    FIND,
    CREATE,
    UPDATE,
    DELETE
}


const sequelize = new Sequelize({
    dialect:"sqlite",
    logging: false,
    sync: true,
    storage: "./.database/db_dev.db"
})
const Product = ProductModel(sequelize)
sequelize.sync()


export  {
    DB_MODEL,
    DB_COMMAND,
    Product,
    initDBHandler
};
