import React from "react"
import { Map, GeoJSON, TileLayer } from "react-leaflet"
import { useFetch } from "../../hooks/UseFetch"
import { backendUrl } from "../../constants"
import L from "leaflet"
import { useArea } from "../../contexts/AreaContextProvider"
import { useYear } from "../../contexts/YearContextProvider"


//import 'leaflet/dist/leaflet.css'


export const ElectionMap = props => {
    const { dispatchArea } = useArea()

    const mapData = props.mapData
    const pointToLayer = (feature, latlng) => {
        return L.circleMarker(latlng, null)
    }

    // hoitaa kartan klikkauksen
    const addAreaInfo = (feature, layer) => {
        if (feature.properties && feature.properties.popupContent) {
            layer.on({
                mouseover: () => { layer.bindPopup(feature.properties.popupContent).openPopup() },
                mouseout: () => { layer.bindPopup(feature.properties.popupContent).closePopup() }
            })
        }
        if (feature.properties && feature.properties.name) {
            layer.on({
                click: () => {
                    dispatchArea({ type: "CHANGE_DISTRICT_TO", to: feature.properties.name })
                }
            })
        }
    }

    return (

    //piirtyy nopeammin jostain syystä kun koko määritellään tässä
    <Map style={{ width: "100%", height: "600px" }} center={[65.5, 25]} dragging={true} attributionControl={false} preferCanvas={true} zoom={5}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <GeoJSON
            keyFunction={mapData}
            data={mapData}
            onEachFeature={addAreaInfo}
            pointToLayer={pointToLayer}

            style={() => ({
                radius: 5,
                color: "#000000",
                weight: 0.75,
                fillColor: "#097ab8",
                fillOpacity: 1
            })}
        />
    </Map>
    )
}