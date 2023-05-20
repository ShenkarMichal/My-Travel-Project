import appConfig from "./app-config"
import dal from "./dal"
import nodemailer from 'nodemailer'

//Check if data exists:
async function isDataExists(data:any, dataName: string, tableName: string): Promise<boolean>{
    const sql = `SELECT COUNT(*) AS count FROM ${tableName} WHERE ${dataName} = ?`
    const resoult = await dal.execute(sql, [data])
    const count = resoult[0].count
    return count > 0    
}

//Send Email to the user:
async function sendEmailToUser(userEmail:string, subject: string, message: string) {
    try {
        // Config details for sending the email:
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: appConfig.systemEmail,
                pass: appConfig.systmeEmailPass,
            },
        });
  
        // Set up the email details:
        const mailOptions = {
            from: appConfig.systemEmail,
            to: userEmail,
            subject: subject,
            html: message,
        };
  
        // Send the email:
        await transporter.sendMail(mailOptions);  
        
    } 
    catch (err: any) {
      console.log('Error sending email:', err);
    }
}

export default {
    isDataExists,
    sendEmailToUser
}