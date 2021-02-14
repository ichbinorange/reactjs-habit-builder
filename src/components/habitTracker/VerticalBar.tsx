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
    datePickerFormat: string;
    datePicker: Date;
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
    
    // for filter data - retrieve month's data (t/f)
    const getYear = (date: {searchYear: Date, recordYear: string}) => {
        return new Date(date.searchYear).getFullYear() === new Date(date.recordYear).getFullYear()
    }

    // for filter data - retrieve month's data (t/f)
    const getMonth = (date: {searchMonth: Date, recordDate: string}) => {
        return new Date(date.searchMonth).getMonth() === new Date(date.recordDate).getMonth()
    }

    // for organize monthly data - accumulate the info based on date
    const getMonthly = (date: string) => {
        return new Date(date).getMonth()
    }

    // for organize daily data - accumulate the info based on date
    const getDate = (date: string) => {
        return new Date(date).getDate()
    }

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
        let habitData: { [key: string]: VerticalBarSeriesPoint[]; } = {};
        let habitLegend:  { [key: string]: legendinfo; } = {};
        let yAxisMax: number = 0;
        let yAxisCollection: number[] = [];
        if (props.datePickerFormat.length === 5) { // month data
            yAxisCollection = Array<number>(daysPerMonth(`${props.datePicker}`)).fill(0);
            if (props.habitId === -1) { // for multiple habits
                // step 1: create habitData
                const filterHabitComponents = habitTrackerData.filter((habitTracker: any) => (getMonth({searchMonth: props.datePicker, recordDate: habitTracker.createdDate}) && getYear({searchYear: props.datePicker, recordYear: habitTracker.createdDate}))).map((filteredHabitTracker: any) => {
                    let index: number = getDate(filteredHabitTracker.createdDate) - 1;
                    if (!habitData.hasOwnProperty(filteredHabitTracker.habit.id)) { // generate VerticalBarSeriesPoint[] template for a habit 
                        habitData[filteredHabitTracker.habit.id] = new Array(daysPerMonth(`${props.datePicker}`));
                        for (let i = 0; i < habitData[filteredHabitTracker.habit.id].length; i++) {
                            habitData[filteredHabitTracker.habit.id][i] = { x: (i + 1), y: 0 };
                        }
                    }
                    habitData[filteredHabitTracker.habit.id][index].y += filteredHabitTracker.workTime;
                    yAxisCollection[index] += filteredHabitTracker.workTime;
                })
                // step 2: turn habitData into habitLegend
                let tempIndex = 0;
                for (const habitobj in habitData) {
                    habitLegend[habitobj] = {title: `Habit#${habitobj}`, color: BAR_COLOR[tempIndex]};
                    tempIndex += 1;
                }
                // step 3: find the max in yAxisCollection
                yAxisMax = Math.max(...yAxisCollection);

            } else { // for single habit
                habitData[props.habitId] = new Array(daysPerMonth(`${props.datePicker}`));
                for (let i = 0; i < habitData[props.habitId].length; i++) {
                    habitData[props.habitId][i] = { x: (i + 1), y: 0 };
                }
                const filterHabitComponents = habitTrackerData.filter((habitTracker: any) => (habitTracker.habit.id === props.habitId && getMonth({searchMonth: props.datePicker, recordDate: habitTracker.createdDate}) && getYear({searchYear: props.datePicker, recordYear: habitTracker.createdDate}))).map((filteredHabitTracker: any) => {
                    let index: number = getDate(filteredHabitTracker.createdDate) - 1;
                    habitData[props.habitId][index].y += filteredHabitTracker.workTime;
                    if (yAxisMax < habitData[filteredHabitTracker.habit.id][index].y) {
                        yAxisMax = habitData[filteredHabitTracker.habit.id][index].y
                    };
                  }
                )
                habitLegend[props.habitId] = {title: `Habit#${props.habitId}`, color: BAR_COLOR[0]};
            }
        } else { // year data
            yAxisCollection = Array<number>(12).fill(0); // fixed 12 months
            if (props.habitId === -1) { // for multiple habits
                // step 1: create habitData
                const filterHabitComponents = habitTrackerData.filter((habitTracker: any) => (getYear({searchYear: props.datePicker, recordYear: habitTracker.createdDate}))).map((filteredHabitTracker: any) => {
                    let index: number = getMonthly(filteredHabitTracker.createdDate);
                    if (!habitData.hasOwnProperty(filteredHabitTracker.habit.id)) { // generate VerticalBarSeriesPoint[] template for a habit 
                        habitData[filteredHabitTracker.habit.id] = new Array(12); // fixed 12 months
                        for (let i = 0; i < habitData[filteredHabitTracker.habit.id].length; i++) {
                            habitData[filteredHabitTracker.habit.id][i] = { x: (i + 1), y: 0 };
                        }
                    }
                    habitData[filteredHabitTracker.habit.id][index].y += filteredHabitTracker.workTime;
                    yAxisCollection[index] += filteredHabitTracker.workTime;
                })
                // step 2: turn habitData into habitLegend
                let tempIndex = 0;
                for (const habitobj in habitData) {
                    habitLegend[habitobj] = {title: `Habit#${habitobj}`, color: BAR_COLOR[tempIndex]};
                    tempIndex += 1;
                }
                // step 3: find the max in yAxisCollection
                yAxisMax = Math.max(...yAxisCollection);

            } else { // for single habit
                habitData[props.habitId] = new Array(12); // fixed 12 months
                for (let i = 0; i < habitData[props.habitId].length; i++) {
                    habitData[props.habitId][i] = { x: (i + 1), y: 0 };
                }
                const filterHabitComponents = habitTrackerData.filter((habitTracker: any) => (habitTracker.habit.id === props.habitId && getYear({searchYear: props.datePicker, recordYear: habitTracker.createdDate}))).map((filteredHabitTracker: any) => {
                    let index: number = getMonthly(filteredHabitTracker.createdDate);
                    habitData[props.habitId][index].y += filteredHabitTracker.workTime;
                    if (yAxisMax < habitData[filteredHabitTracker.habit.id][index].y) {
                        yAxisMax = habitData[filteredHabitTracker.habit.id][index].y
                    };
                  }
                )
                habitLegend[props.habitId] = {title: `Habit#${props.habitId}`, color: BAR_COLOR[0]};
            }
        }
        
        yAxisMax += 1;
        return {habitLegend, habitData, yAxisMax}
    }

    const renderChart = () => {
        // show empty chart for month/year has no data
        if (convertMonthData().yAxisMax === 1) {
            if (props.datePickerFormat.length === 5) { // month
                return (
                    <div>
                        <DiscreteColorLegend
                            orientation="horizontal"
                            items={[]}
                        />
                        <XYPlot stackBy="y"
                                xDomain={[1, daysPerMonth(`${props.datePicker}`)]}
                                yDomain={[0, 6]} 
                                width={500}
                                height={300}>
                            <HorizontalGridLines />
                            <XAxis attr="x"
                                    attrAxis="y"
                                    orientation="bottom"
                                    title={`day (${MONTH_LIST[props.datePicker.getMonth()]}, ${props.datePicker.getFullYear()})`}/>
                            <YAxis attr="y"
                                    attrAxis="x"
                                    orientation="left"
                                    title="time spent(hr)"/>
                            <VerticalBarSeries
                                color=''
                                barWidth={0.4}
                                data={[{x:0,y:0}]}
                                style={{}}
                            />
                        </XYPlot>
                    </div>
                )
            } else { // year
                return (
                    <div>
                        <DiscreteColorLegend
                            orientation="horizontal"
                            items={[]}
                        />
                        <XYPlot stackBy="y"
                                xDomain={[0, 12]}
                                yDomain={[0, 6]} 
                                width={500}
                                height={300}>
                            <HorizontalGridLines />
                            <XAxis attr="x"
                                    attrAxis="y"
                                    orientation="bottom"
                                    title={`(Month of ${props.datePicker.getFullYear()})`}/>
                            <YAxis attr="y"
                                    attrAxis="x"
                                    orientation="left"
                                    title="time spent(hr)"/>
                            <VerticalBarSeries
                                color=''
                                barWidth={0.4}
                                data={[{x:0,y:0}]}
                                style={{}}
                            />
                        </XYPlot>
                    </div>
                )
            }
        }

        if (props.datePickerFormat.length === 5) { // month data
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
                                xDomain={[1, daysPerMonth(`${props.datePicker}`)]}
                                yDomain={[0, convertMonthData().yAxisMax]} 
                                width={500}
                                height={300}>
                            <HorizontalGridLines />
                            <XAxis attr="x"
                                    attrAxis="y"
                                    orientation="bottom"
                                    title={`day (${MONTH_LIST[props.datePicker.getMonth()]}, ${props.datePicker.getFullYear()})`}/>
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
                                xDomain={[1, daysPerMonth(`${props.datePicker}`)]}
                                yDomain={[0, convertMonthData().yAxisMax]} 
                                width={500}
                                height={300}>
                            <HorizontalGridLines />
                            <XAxis attr="x"
                                    attrAxis="y"
                                    orientation="bottom"
                                    title={`day (${MONTH_LIST[props.datePicker.getMonth()]}, ${props.datePicker.getFullYear()})`}/>
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
        } else { // year data
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
                                xDomain={[1, 12]}
                                yDomain={[0, convertMonthData().yAxisMax]} 
                                width={500}
                                height={300}>
                            <HorizontalGridLines />
                            <XAxis attr="x"
                                    attrAxis="y"
                                    orientation="bottom"
                                    title={`(Month of ${props.datePicker.getFullYear()})`}/>
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
                                xDomain={[1, 12]}
                                yDomain={[0, convertMonthData().yAxisMax]} 
                                width={500}
                                height={300}>
                            <HorizontalGridLines />
                            <XAxis attr="x"
                                    attrAxis="y"
                                    orientation="bottom"
                                    title={`(Month of ${props.datePicker.getFullYear()})`}/>
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
    }
    
    return (
        <div>
            {renderChart()}
        </div>
    );
}

export default VerticalBar;