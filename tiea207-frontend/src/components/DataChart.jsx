import React, {useContext, useEffect, useRef} from "react"
//import {BarChart, CartesianGrid, XAxis, Tooltip, YAxis, Legend, Bar} from "recharts"
import {AreaContext, YearContext} from "../Contexts"
import {Chart} from "react-google-charts"

export const DataChart = (props) => {
    const { area } = useContext(AreaContext)
    const { year, setYear } = useContext(YearContext)

    const usePrevious = (value) => {
        // The ref object is a generic container whose current property is mutable ...
        // ... and can hold any value, similar to an instance property on a class
        const ref = useRef();
        
        // Store current value in ref
        useEffect(() => {
          ref.current = value;
        }, [value]); // Only re-run if value changes
        
        // Return previous value (happens before update in useEffect above)
        return ref.current;
      }


 
    const data = Object.keys(props.luvut)
    .map((key) => {
        const fillColor = props.luvut[key].fill
        const label = props.luvut[key].name
        const value = props.luvut[key].vote
        return [label, value, fillColor]
    })
    

    const dataWithHeaders = [["Puolue", "Kannatusprosentti", { role: 'style' }]].concat(data.slice(0,11))
    const prevDataWithHeaders = usePrevious(dataWithHeaders);
    return (<>
            {data.length > 0 && <Chart
                width={'600px'}
                height={'600px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={ dataWithHeaders }
                options={{
                    title: area + " " + year,
                    animation: {
                        duration: 1000,
                        easing: 'out',
                        startup: true,
                      },    
                    bar: { groupWidth: '80%' },
                    legend: { position: 'none' },
                }}
                controls={[
                    {
                      controlType: "NumberRangeFilter",
                      options: {
                        filterColumnLabel: 'Kannatusprosentti',
                      },
                      controlWrapperParams: {
                        state: { lowValue: 0, highValue: 100 },
                      },
                    }]}
        
                rootProps={{ 'data-testid': '1' }}
                />}
        </>
    )
}