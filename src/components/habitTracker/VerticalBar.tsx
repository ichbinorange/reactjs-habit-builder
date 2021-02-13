import React, { useState, useEffect } from "react";
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesPoint,
    DiscreteColorLegend,
} from "react-vis";

type stateType = {
    currentUser: any;
    habitId: number;
}

type legendinfo = {
    title: string;
    color: string;
}

const MONTH_LIST: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const BAR_COLOR: string[] = ['#19CDD7', '#DDB27C', '#88572C', '#FF991F', '#F15C17', '#223F9A', '#DA70BF', '#125C77', '#4DC19C', '#776E57', '#12939A', '#17B8BE', '#F6D18A', '#B7885E', '#FFCB99', '#F89570', '#829AE3', '#E79FD5', '#1E96BE', '#89DAC1', '#B3AD9E']

const VerticalBar: React.FC<stateType> = (props) => {
    const [habitTrackerData, setHabitTrackerData] = useState<Object[]>([]);
    const [errorMessage, setErrorMessage] = useState<String>('');
    
    // for x-axis's month chart - to get how many days in a month for a specific year
    const daysPerMonth = (date: string) => {
      return new Date(new Date(date).getFullYear(), new Date(date).getMonth() + 1, 0).getDate()
    }
    
    // for filter data - retrieve this month's data (t/f)
    const getThisMonth = (date: string) => {
        return new Date(date).getMonth() === new Date().getMonth()
    }

    // for organize daily data - accumulate the info based on date
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

    // for habits' month data
    const convertMonthData = () => {
        let habitData: { [key: number]: VerticalBarSeriesPoint[]; } = {};
        let habitLegend:  { [key: number]: legendinfo; } = {};
        if (props.habitId === -1) { // for multiple habits
            // step 1: create habitData
            const filterHabitComponent1 = habitTrackerData.filter((habitTracker: any) => (getThisMonth(habitTracker.createdDate))).map((filteredHabitTracker: any) => {
                let index: number = getDate(filteredHabitTracker.createdDate) - 1;
                if (!habitData.hasOwnProperty(filteredHabitTracker.habit.id)) {
                    habitData[filteredHabitTracker.habit.id] = new Array(daysPerMonth(`${new Date()}`));
                    for (let i = 0; i < habitData[filteredHabitTracker.habit.id].length; i++) {
                        if (habitData[filteredHabitTracker.habit.id][i] == undefined) {
                            habitData[filteredHabitTracker.habit.id][i] = { x: (i + 1), y: 0 }
                        }
                    }
                    habitData[filteredHabitTracker.habit.id][index] = { x: (index + 1), y: filteredHabitTracker.workTime }
                } else {
                    if (habitData[filteredHabitTracker.habit.id][index] == undefined) {
                        habitData[filteredHabitTracker.habit.id][index] = { x: (index + 1), y: filteredHabitTracker.workTime }
                    } else {
                        habitData[filteredHabitTracker.habit.id][index].y += filteredHabitTracker.workTime 
                    }
                }
              }
            )
            // step 2: turn habitData into habitLegend
            let tempIndex = 0;
            for (const habitobj in habitData) {
                habitLegend[habitobj] = {title: `Habit#${habitobj}`, color: BAR_COLOR[tempIndex]};
                tempIndex += 1;
            }
        } else { // for single habit
            habitData[props.habitId] = new Array(daysPerMonth(`${new Date()}`));
            for (let i = 0; i < habitData[props.habitId].length; i++) {
                if (habitData[props.habitId][i] == undefined) {
                    habitData[props.habitId][i] = { x: (i + 1), y: 0 }
                }
            }
            const filterHabitComponents = habitTrackerData.filter((habitTracker: any) => (habitTracker.habit.id === props.habitId && getThisMonth(habitTracker.createdDate))).map((filteredHabitTracker: any) => {
                let index: number = getDate(filteredHabitTracker.createdDate) - 1;
                if (habitData[props.habitId][index] == undefined) {
                    habitData[props.habitId][index] = { x: (index + 1), y: filteredHabitTracker.workTime }
                } else {
                    habitData[props.habitId][index].y += filteredHabitTracker.workTime 
                }
              }
            )
            habitLegend[props.habitId] = {title: `Habit#${props.habitId}`, color: BAR_COLOR[0]};
        }
        
        return {habitLegend, habitData}
    }

    const renderChart = () => {
        if (props.habitId === -1) {
            let itemArray: legendinfo[] = new Array();
            const legendItems = () => {
                for (const habit in convertMonthData().habitLegend) {
                    itemArray.push(convertMonthData().habitLegend[habit]);
                }
                return itemArray;
            }
            const dataBar = () => {
                let barCollection = [];
                for (const habit in convertMonthData().habitData) {
                    barCollection.push([convertMonthData().habitData[habit], convertMonthData().habitLegend[habit].color])
                }
                return barCollection;
            }

            return (
                <div>
                    <DiscreteColorLegend
                        orientation="horizontal"
                        items={legendItems()}
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
                                title="time spent (hr)"/>
                        {dataBar().map((habitObj: any) => {
                            return <VerticalBarSeries key={habitObj[1]}
                                                      color={habitObj[1]}
                                                      barWidth={0.4}
                                                      data={habitObj[0]}
                                                      style={{}}
                        />
                        })}
                    </XYPlot>
                </div>
            )
        } else {
            return (
                <div>
                    <DiscreteColorLegend
                        orientation="horizontal"
                        items={[convertMonthData().habitLegend[props.habitId]]}
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
                                title="time spent(hr)"/>
                        <VerticalBarSeries
                            color='#19CDD7'
                            barWidth={0.4}
                            data={convertMonthData().habitData[props.habitId]}
                            style={{}}
                        />
                    </XYPlot>
                </div>
            )
        }
    }
    
    return (
        <div>
            {renderChart()}
        </div>
    );
}

export default VerticalBar;