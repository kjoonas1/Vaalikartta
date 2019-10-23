import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory"
import React from "react"
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from "recharts"


export const VictoryDataChart = (props) => {
    return (<VictoryChart height={300} width={800}
        theme={VictoryTheme.material} 
        maxDomain={{ y: 100 }} 
        domainPadding={10} 
        style={{ 
            fontSize: 5 }}>
    <VictoryAxis
        style={{
        tickLabels: {
            fontSize: 10,
        }
        }}
    />
    <VictoryAxis dependentAxis
    label="Kannatus %"
    tickFormat={(t) => `${Math.round(t)}%`}
    style={{
        
        ticks: {
        padding: 12 ,
        stroke: 'transparent',
        },
        tickLabels: {
        fontSize: 10
        }
    }}
    standalone={false}
    />
        <VictoryBar 
            style={{ data: { fill: ("tomato"), width: 18 } }}
            data={props.luvut}
            animate={{
                duration: 1800,
                onLoad: { duration: 1000 }
            }}
        />
    </VictoryChart>)
}

export const DataChart = (props) => {
    const bars =  Object.keys(props.luvut).map((key, value) => {
            return <Bar key={value} fill="#8884d8" dataKey={(props.luvut[key].name)} />
        })

    console.log(props.luvut)
    

    return (<BarChart width={780} height={250} data={props.luvut}>
    <CartesianGrid strokeDasharray="3 3" />

    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    {bars}
  </BarChart>)
}