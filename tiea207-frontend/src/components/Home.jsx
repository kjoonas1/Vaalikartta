import React from "react"
import { Map, GeoJSON } from "react-leaflet"
// Tätyy vielä miettiä, että miten tämä tiedosto saadaan välitettyä frontille
// Löytyy linkistä: https://raw.githubusercontent.com/tomimick/mapcolorizer/master/data-finland/data/kuntarajat-ok.geojson
import data from "../kuntarajat-ok.json"

const Home = () => {
    // Tällä kiinnitetään jokaiseen "featureen" eli kuntaa edustavaan monikulmioon
    // klikattaessa ilmestyvä popup
    const addPopup = (feature, layer) => {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name)
        }
    }

    return (
        <Map center={[65.1, 25.489]} zoom={5}>
            <GeoJSON
                keyFunction={data}
                data={data}
                onEachFeature={addPopup}
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

export default Home
