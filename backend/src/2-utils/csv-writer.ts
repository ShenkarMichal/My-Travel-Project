import {createObjectCsvWriter} from 'csv-writer'


const csv = createObjectCsvWriter({
    path: `../1-assets/files/${new Date().toDateString()}`,
    header: [
        {id: "destination", title: "Destination"},
        {id: "followers-count", title: "Followers-Count"}
    ]
})

async function writeCsv(data: any[]): Promise<string> {
    try {
        await csv.writeRecords(data)    
        console.log("The CSV file was download")
        return new Date().toDateString()
    }
    catch (err: any) {
        console.log(err)        
    }    
}

export default {
    writeCsv
}