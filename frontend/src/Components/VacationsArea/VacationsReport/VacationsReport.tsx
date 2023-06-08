import { useEffect, useState } from "react";
import "./VacationsReport.css";
import { VictoryBar, VictoryLabel, VictoryPie, VictorySharedEvents } from 'victory';
import followersService from "../../../5-Service/FollowersService";

function VacationsReport(): JSX.Element {

    const [data, setData] = useState<any[]>([])
    useEffect(()=>{
        followersService.getDataToReport()
            .then(d => setData(d))
            .catch(err => console.log(err))        
    },[])

    const dataGragh: any[] = data.map(d => { return {x: d.destination, y: d.followers_count }})
    console.log(dataGragh)
    const labels = data.map(d => d.destination)
    return (
        <div className="VacationsReport">
            <>
            {dataGragh &&
                <svg viewBox="0 0 650 350">
                    <VictorySharedEvents
                        events={[{
                        childName: ["pie", "bar"],
                        target: "data",
                        eventHandlers: {
                            onMouseOver: () => {
                            return [{
                                childName: ["pie", "bar"],
                                mutation: (props) => {
                                return {
                                    style: Object.assign({}, props.style, {fill: "tomato"})
                                };
                                }
                            }];
                            },
                            onMouseOut: () => {
                            return [{
                                childName: ["pie", "bar"],
                                mutation: () => {
                                return null;
                                }
                            }];
                            }
                        }
                        }]}
                    >
                        <g transform={"tran slate(150, 50)"}>                    
                            <VictoryBar name="bar"
                                width={300}
                                data={[dataGragh][0]}

                                standalone={false}
                                style={{
                                labels: {fontSize: 20}
                                }}   
                                labels={labels}                        
                                labelComponent={<VictoryLabel text={labels}/>}
                            />
                        </g>
                        <g transform={"translate(0, -75)"}>
                            <VictoryPie name="pie"
                                width={250}
                                standalone={false}
                                style={{ labels: {fontSize: 25, padding: 10}}}
                                labels={labels}
                                data={dataGragh}
                            />
                        </g>
                    </VictorySharedEvents>
                </svg>
            }</>

        </div>
    );
}

export default VacationsReport;
