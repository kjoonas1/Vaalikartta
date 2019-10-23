import React, {useContext} from "react"
import {BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar} from "recharts"
import {AreaContext, YearContext} from "../Contexts"


export const DataChart = (props) => {
    const { area } = useContext(AreaContext)
    const { year } = useContext(YearContext)
    const bars =  Object.keys(props.luvut).map((key) => {
        return <Bar 
                    key={key} 
                    fill={props.luvut[key].fill} 
                    label={props.luvut[key].name} 
                    name={props.luvut[key].name} 
                    animationDuration={3200}
                    isUpdateAnimationActive={true}
                    isAnimationActive={true}
                    dataKey={"vote"} 
                    />
    })
    
    return (<>
            <p>{area} {year}</p>
            <BarChart
                width={820} 
                height={250} 
                data={props.luvut} 
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} />
                <YAxis type="number" domain={[0, 100]}/>
                <Legend />
                {bars}
            </BarChart>
        </>
    )
}