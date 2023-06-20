import axios from "axios"
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

    async function getCountryCode(cityName: string): Promise<string> {
        const username = 'michalSehnaker'; 
        const url = `http://api.geonames.org/searchJSON?q=${encodeURIComponent(cityName)}&maxRows=1&username=${username}`;
      

          const response = await axios.get(url);
          console.log(response.data)
          const { countryCode } = response.data?.geonames[0];
          return countryCode;

  }

//Get weather:
async function getWeather(location: string): Promise<[number, string, string]> {

    const countryCode = await getCountryCode(location);
    const apiKey = '1534bf1641c97d72dc7ac0820cbca55e';
    console.log(location)
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}%20${countryCode}&appid=${apiKey}`;
    
    const response = await axios.get(url);
    const { temp } = response.data.main;
    const { description, icon } = response.data.weather[0];
    const temperatureInCelsius = (temp - 273.15).toFixed(2);

    return [parseFloat(temperatureInCelsius), description, icon];
}

//Get time:
async function getLocalTime(location: string): Promise<string> {
    const countryCode = getCountryCode(location)
      const response = await axios.get(`http://api.geonames.org/timezoneJSON`, {
        params: {
          username: 'michalSehnaker',
          countryCode: countryCode,
        },
      });
      const { time } = response.data;
      console.log(response.data)
      const localTime = new Date(time).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      return localTime;

  }


export default {
    isDataExists,
    sendEmailToUser,
    getWeather,
    getLocalTime
}