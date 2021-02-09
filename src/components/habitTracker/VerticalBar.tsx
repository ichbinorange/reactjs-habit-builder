import React from "react";
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    DiscreteColorLegend,
    LabelSeries
} from "react-vis";

const VerticalBar: React.FC = (props) => {
    const data = [
        { "y": 10, "x": "Jan" },
        { "y": 11, "x": "Feb" },
        { "y": 23, "x": "Mar" },
        { "y": 26, "x": "Apr" },
        { "y": 30, "x": "May" },
        { "y": 31, "x": "Jun" },
        { "y": 31, "x": "Jul" },
        { "y": 34, "x": "Aug" },
        { "y": 38, "x": "Sep" },
        { "y": 40, "x": "Oct" },
        { "y": 44, "x": "Nov" },
        { "y": 44, "x": "Dec" }
    ]

  return (
    <div>
        <DiscreteColorLegend
            orientation="horizontal"
            items={[
            {
                title: 'Apples',
                color: '#12939A'
            },
            {
                title: 'Oranges',
                color: '#79C7E3'
            }
            ]}
        />
        <XYPlot stackBy="y"
                xDomain={[0, 8]}
                yDomain={[0, 50]} 
                width={500}
                height={300}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries
                barWidth={0.3}
                // cluster="stack 1"
                data={[
                {
                    x: 0,
                    y: 10
                },
                {
                    x: 1,
                    y: 9.632265520872615
                },
                {
                    x: 2,
                    y: 8.408382643356175
                },
                {
                    x: 3,
                    y: 7.615857690265608
                },
                {
                    x: 4,
                    y: 6.9709460905684875
                },
                {
                    x: 5,
                    y: 7.106383248559954
                },
                {
                    x: 6,
                    y: 6.881885019869365
                },
                {
                    x: 7,
                    y: 6.982412596281423
                },
                {
                    x: 8,
                    y: 6.974697632695855
                }
                ]}
                style={{}}
            />
            <VerticalBarSeries
                barWidth={0.3}
                // cluster="stack 1"
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
                barWidth={0.3}
                // cluster="stack 1"
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
            />
        </XYPlot>
    </div>
  );
}

export default VerticalBar;

// {/* <XYPlot xType="ordinal"
//         width={500}
//         height={300}
//         yDomain={[0, 300]}>
//         <VerticalGridLines />
//         <HorizontalGridLines />
//         <XAxis />
//         <YAxis />
//         <VerticalBarSeries data={data}
//                             barWidth={0.3} />
// </XYPlot> */}