import { useEffect, useState } from "react";
import "./VacationsReport.css";
import followersService from "../../../5-Service/FollowersService";
// import CanvasJSReact from 'canvasjs-react-charts';

const Canvas = require("canvasjs-react-charts") 
var CanvasJSChart = Canvas.CanvasJSChart;


function VacationsReport(): JSX.Element {

    const [data, setData] = useState<any[]>([])
    useEffect(()=>{
        followersService.getDataToReport()
            .then(d => setData(d))
            .catch(err => console.log(err))        
    },[])

    const dataGragh: any[] = data.map(d => { return {y: d.followers_count, label: d.destination }})

    //Set the Pie settings:
    const pieOptions = {
        // exportEnabled: true,
        animationEnabled: true,
        
        title: {
            text: ""
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y} followers",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y} followers",
            dataPoints:dataGragh
        }]
    }

    const barOptions = {
        title: {
            text: ""
        },
        animationEnabled: true,
        data: [
        {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: dataGragh
        }
        ]
    }

    return (
        <div className="VacationsReport">
            <div className="Background"></div>
            <div className="Content">
                <div className="Heading">
                    <h3>Vacations Followers Report</h3>
                </div>
                <div className="AllData">
                    <div className="Charts">            
                        <div className="canvas">
                            <CanvasJSChart options = {pieOptions} />
                        </div>	
                        <div className="canvas">
                            <CanvasJSChart options = {barOptions} />
                        </div>	
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VacationsReport;
