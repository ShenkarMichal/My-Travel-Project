import { useEffect, useState } from "react";
import "./VacationsReport.css";
import followersService from "../../../5-Service/FollowersService";
import { Checkbox } from "@mui/material";
import ViewColumnRoundedIcon from '@mui/icons-material/ViewColumnRounded';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';

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

    const [pie, setPie] = useState<boolean>(true)
    const [column, setColumn] = useState<boolean>(false)

    async function handlePie(event: React.ChangeEvent<HTMLInputElement>) {
        setPie(event.target.checked)
        
        if(!pie){
            setColumn(false)
        }
    }

    async function handleColumn(event: React.ChangeEvent<HTMLInputElement>) {
        setColumn(event.target.checked)
        
        if(!column){
            setPie(false)
        }
    }

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
                        <Checkbox 
                            checked = {pie}
                            onChange={handlePie}
                            title="Pie display" 
                            icon={<PieChartOutlineOutlinedIcon 
                            sx={{fontSize: 40}}/>} 
                            checkedIcon={<PieChartRoundedIcon color="error" sx={{fontSize: 40}}/>} 
                        />
                        <Checkbox
                            checked = {column}
                            onChange={handleColumn}
                            title="Column display"
                            icon={<ViewWeekOutlinedIcon sx={{fontSize: 40}} />}
                            checkedIcon={<ViewColumnRoundedIcon color="error" sx={{fontSize: 40}} />}                    
                        /> 
                        {pie &&         
                            <div className="canvas">
                                <CanvasJSChart options = {pieOptions} />
                            </div>
                        }
                        {column &&	
                            <div className="canvas">
                                <CanvasJSChart options = {barOptions} />
                            </div>	
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VacationsReport;
