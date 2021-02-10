import React, { useState, useEffect } from "react";
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesPoint,
    DiscreteColorLegend,
} from "react-vis";

type stateType = {
    currentUser: any;
    habitId: number;
}

const MONTH_LIST: Array<string> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DAY_LIST: Array<number> = Array.from(Array(32).keys()).slice(1,32)

const VerticalBar: React.FC<stateType> = (props) => {
    const [habitTrackerData, setHabitTrackerData] = useState<Object[]>([]);
    const [errorMessage, setErrorMessage] = useState<String>('');
    
    // get how many days in a month for a specific year
    const daysPerMonth = (date: string) => {
      return new Date(new Date(date).getFullYear(), new Date(date).getMonth() + 1, 0).getDate()
    }
    
    // retrieve this month's data
    const getThisMonth = (date: string) => {
        return new Date(date).getMonth() === new Date().getMonth()
    }

    // check the date and collect the data
    const getDate = (date: string) => {
        return new Date(date).getDate()
    }
    //   <p>{new Date(props.createdDate).getMonth()}</p>  --> 
    //   <p>{new Date(props.createdDate).getFullYear()}</p>

    useEffect(() => {
        axios.get(`${API_BASE_URL}/habitTrackers/${props.currentUser.id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
        .then((response) => {
            const getHabitTrackerData = response.data;
            setHabitTrackerData([...getHabitTrackerData]);
            setErrorMessage('');
        })
        .catch((error) => {
            setErrorMessage(`Unable to add a new habit record`);
        });
    }, []); 

    let habitData: VerticalBarSeriesPoint[] = new Array(daysPerMonth(`${new Date()}`));
    const filterHabitComponents = habitTrackerData.filter((habitTracker: any) => (habitTracker.habit.id === props.habitId && getThisMonth(habitTracker.createdDate))).map((filteredHabitTracker: any) => {
        let index: number = getDate(filteredHabitTracker.createdDate);
        if (habitData[index] == undefined) {
            habitData[index] = { x: (index + 1), y: filteredHabitTracker.workTime }
        } else {
            habitData[index].y += filteredHabitTracker.workTime 
        }
        return habitData
      }
    )

    // const habitTrackerComponents = habitTrackerData.map((habitTracker: any) => {
    // })

    
    return (
        <div>
            <DiscreteColorLegend
                orientation="horizontal"
                items={[
                {
                    title: 'Habit#1',
                    color: '#19CDD7'
                },
                {
                    title: 'Habit#1',
                    color: '#DDB27C'
                },
                {
                    title: 'Habit#3',
                    color: '#88572C'
                }
                ]}
            />
            <XYPlot stackBy="y"
                    xDomain={[0, 8]}
                    yDomain={[0, 12]} 
                    width={500}
                    height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries
                    color='#19CDD7'
                    barWidth={0.4}
                    data={filterHabitComponents}
                    style={{}}
                />
                {/* <VerticalBarSeries
                    barWidth={0.4}
                    color='#DDB27C'
                    data={[
                    {
                        x: 0,
                        y: 10
                    },
                    {
                        x: 1,
                        y: 9.465822407644225
                    },
                    {
                        x: 2,
                        y: 8.058164550777553
                    },
                    {
                        x: 3,
                        y: 6.8148122483295195
                    },
                    {
                        x: 4,
                        y: 6.281585633203402
                    },
                    {
                        x: 5,
                        y: 7.115838957652743
                    },
                    {
                        x: 6,
                        y: 7.776259783194436
                    },
                    {
                        x: 7,
                        y: 8.022734318458077
                    },
                    {
                        x: 8,
                        y: 9.4359862665724
                    }
                    ]}
                    style={{}}
                />
                <VerticalBarSeries
                    barWidth={0.4}
                    color='#88572C'
                    data={[
                    {
                        x: 0,
                        y: 10
                    },
                    {
                        x: 1,
                        y: 9.078216969430041
                    },
                    {
                        x: 2,
                        y: 8.541108080270531
                    },
                    {
                        x: 3,
                        y: 8.81957939963016
                    },
                    {
                        x: 4,
                        y: 8.862428204523804
                    },
                    {
                        x: 5,
                        y: 7.488062709992124
                    },
                    {
                        x: 6,
                        y: 7.797321036314394
                    },
                    {
                        x: 7,
                        y: 8.144588432131005
                    },
                    {
                        x: 8,
                        y: 9.289698776070031
                    }
                    ]}
                    style={{}}
                /> */}
            </XYPlot>
        </div>
    );
}

export default VerticalBar;