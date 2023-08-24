const connection = require(`../config`)

const tableName = `telur`

exports.ambilData = () => {
    return new Promise((resolve, rejected) => {

        let query = `select * from ${tableName}
        order by jenis_telur ASC`

        connection.query(query, (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

exports.ambilDataDenganParameter = (parameter) => {
    return new Promise((resolve, rejected) => {
  
        let params = Object
            .keys(parameter)
            .map(key => `${key}="${parameter[key]}"`)
            .join(" and ")                                          
      
        let query = `select * from ${tableName} where ${params}`

        console.log(`Run: ${query}`)

        
        connection.query(query, (error, result) => {
            if (error) {
                
                rejected(error)
            }

           
            resolve(result)
        })
    })
}

exports.tambahData = (dataObject) => {
    return new Promise((resolve, rejected) => {
       
        let columns = Object.keys(dataObject).join()

        let values = Object.values(dataObject)
            .map(value => `"${value}"`).join()
        
        let query = `insert into ${tableName} (${columns}) values (${values})`

        
        console.log(`Run: ${query}`)

      
        connection.query(query, (error, result) => {
            if (error) {
                
                rejected(error.message)
            }

         
            resolve(result)
        })
    })
}


exports.update = (dataObject, parameter) => {
    return new Promise((resolve, rejected) => {
       
        let dataBaru = Object
            .keys(dataObject)
            .map(key => `${key}="${dataObject[key]}"`)
            .join()
        
        let params = Object
            .keys(parameter)
            .map(key => `${key}="${parameter[key]}"`)
            .join(" and ")
        
        let query = `update ${tableName} set ${dataBaru} where ${params}`

        
        console.log(`Run: ${query}`)

      
        connection.query(query, (error, result) => {
            if (error) {
               
                rejected(error.message)
            }

           
            resolve(result)
        })
    })
}


exports.hapusData = (parameter) => {
    return new Promise((resolve, rejected) => {
       
        let params = Object
            .keys(parameter)
            .map(key => `${key}="${parameter[key]}"`)
            .join(" and ")
      
        let query = `delete from ${tableName} where ${params}`

     
        console.log(`Run: ${query}`)

        connection.query(query, (error, result) => {
            if (error) {
                /** reject with error message */
                rejected(error.message)
            }

            /** return resolve with data */
            resolve(result)
        })
    })
} 