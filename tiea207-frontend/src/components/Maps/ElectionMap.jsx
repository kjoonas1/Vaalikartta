import React, { useContext } from "react"
import { Map, GeoJSON } from "react-leaflet"
import { AreaContext } from "../../Contexts"

export const ElectionMap = props => {
    const { setArea } = useContext(AreaContext)
    // hoitaa kartan klikkauksen
    const addAreaInfo = (feature, layer) => {
        if (feature.properties && feature.properties.name) {
            layer.on({
                click: event => setArea(event.target.feature.properties.name)
            })
        }
    }

    return (
        <Map center={[65.1, 25.489]} dragging={false} attributionControl={false} preferCanvas={true} zoom={5}>
            <GeoJSON
                keyFunction={props.mapData.data}
                data={props.mapData.data}
                onEachFeature={addAreaInfo}
                style={() => ({
                    color: "#4a83ec",
                    weight: 0.75,
                    fillColor: "#18447e",
                    fillOpacity: 1
                })}
            />
        </Map>
    )
}
