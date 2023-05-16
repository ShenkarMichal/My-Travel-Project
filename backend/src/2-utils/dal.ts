import mySql from 'mysql'
import appConfig from './app-config'

const connection = mySql.createPool({
    host: appConfig.host,
    user: appConfig.user,
    password: appConfig.password,
    database: appConfig.database    
})

function execute(sql: string, values?: any[]): Promise<any> {
    return new Promise<any>((resolve, reject)=>{
        connection.query(sql, values, (err, resoult)=>{
            if(err){
                reject(err)
                return
            }
            resolve(resoult)
        })
    })
}

export default {
    execute
}