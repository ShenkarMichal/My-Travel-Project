import {createObjectCsvWriter} from 'csv-writer'
import fs from 'fs'
import path from 'path';

const now = new Date().toDateString()
const filePath = path.join(__dirname, '..', '..','src', '1-assets', 'files', `output-${new Date().toDateString()}.csv`);
const csv = createObjectCsvWriter({
    path: filePath ,
    header: [
        {id: "destination", title: "Destination"},
        {id: "followers_count", title: "Followers-Count"}
    ]
})

async function writeCsv(data: any[]) {
    try {
        //Delete the current file if exists:
        console.log(filePath)
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        await csv.writeRecords(data)
        console.log("success")    
    }
    catch (err: any) {
        console.log(err)
        
    }    
   
}

export default {
    writeCsv
}