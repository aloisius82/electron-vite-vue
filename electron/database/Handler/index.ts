import { ipcMain} from "electron"
import handlerProduct from "./HandlerProduct";
import { DB_MODEL } from "..";

const inSuccess = (result) => {
    return {
        erorr: null,
        result
    }
} 

const inError = (error)=>{
    return {
        error,
        result: null
    }
}

const initDBHandler =  () => {
    console.log('init handler')
    ipcMain.handle('datasource-service',(e: any, modelName:any, command: any, parm: any)=>{
        switch (modelName) {
            case DB_MODEL.PRODUCT:
                return handlerProduct(command, parm)        
            default:
                return inError({ message: 'Model not found'})
                break;
        }
    })
}

export { 
    initDBHandler,
    inError,
    inSuccess 
}