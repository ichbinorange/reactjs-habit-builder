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
                yDomain={[0, 50]} 
                width={500}
                height={300}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries
                color='#19CDD7'
                barWidth={0.4}
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
            />
        </XYPlot>
    </div>
  );
}

export default VerticalBar;