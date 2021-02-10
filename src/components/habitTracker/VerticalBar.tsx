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
// const DAY_LIST: Array<number> = Array.from(Array(32).keys()).slice(1,32)

const VerticalBar: React.FC<stateType> = (props) => {
    const [habitTrackerData, setHabitTrackerData] = useState<Object[]>([]);
    const [errorMessage, setErrorMessage] = useState<String>('');
    
    // get how many days in a month for a specific year
    const daysPerMonth = (date: string) => {
      return new Date(new Date(date).getFullYear(), new Date(date).getMonth() + 1, 0).getDate()
    }
    
    // retrieve this month's data (t/f)
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

    const convertMonthData = () => {
        let habitData: VerticalBarSeriesPoint[] = new Array(daysPerMonth(`${new Date()}`));
        for (let i = 0; i < habitData.length; i++) {
            if (habitData[i] == undefined) {
                habitData[i] = { x: (i + 1), y: 0 }
            }
        }

        const filterHabitComponents = habitTrackerData.filter((habitTracker: any) => (habitTracker.habit.id === props.habitId && getThisMonth(habitTracker.createdDate))).map((filteredHabitTracker: any) => {
            let index: number = getDate(filteredHabitTracker.createdDate) - 1;
            if (habitData[index] == undefined) {
                habitData[index] = { x: (index + 1), y: filteredHabitTracker.workTime }
            } else {
                habitData[index].y += filteredHabitTracker.workTime 
            }
          }
        )
        return habitData
    }

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
                // {
                //     title: 'Habit#1',
                //     color: '#DDB27C'
                // },
                // {
                //     title: 'Habit#3',
                //     color: '#88572C'
                // }
                ]}
            />
            <XYPlot stackBy="y"
                    xDomain={[0, daysPerMonth(`${new Date()}`)]}
                    yDomain={[0, 12]} 
                    width={500}
                    height={300}>
                <HorizontalGridLines />
                <XAxis attr="x"
                        attrAxis="y"
                        orientation="bottom"
                        title={`day (${MONTH_LIST[new Date().getMonth()]}, ${new Date().getFullYear()})`}/>
                <YAxis attr="y"
                        attrAxis="x"
                        orientation="left"
                        title="spending time (hr)"/>
                <VerticalBarSeries
                    color='#19CDD7'
                    barWidth={0.4}
                    data={convertMonthData()}
                    style={{}}
                />
            </XYPlot>
        </div>
    );
}

export default VerticalBar;