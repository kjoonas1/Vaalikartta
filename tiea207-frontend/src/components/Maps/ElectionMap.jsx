import React, { useContext } from "react"
import { Map, GeoJSON, TileLayer } from "react-leaflet"
import { AreaContext, YearContext } from "../../contexts/Contexts"
import { useFetch } from "../../hooks/UseFetch"
import { backendUrl } from "../../constants"

export const ElectionMap = () => {
    const { dispatchArea } = useContext(AreaContext)
    const { year } = useContext(YearContext)
    const { data, error, isLoading } = useFetch(`${backendUrl}/api/kunnat/koordinaatit/${year}`)
    const mapData = data
    // hoitaa kartan klikkauksen
    const addAreaInfo = (feature, layer) => {
        if (feature.properties && feature.properties.name) {
            layer.on({
                click: () => {
                    console.log(feature)
                    dispatchArea({ type: "CHANGE_DISTRICT_TO", to: feature.properties.name })
                }
            })
        }
    }

    if (isLoading)
        return <div>Loading...</div>
    if (error)
        return <div>Error!</div>

    return (
        <Map center={[64, 25]} dragging={true} attributionControl={false} preferCanvas={true} zoom={5}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON
                keyFunction={mapData}
                data={mapData}
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
