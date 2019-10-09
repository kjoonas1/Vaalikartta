
import React from "react"
import { Map, GeoJSON } from "react-leaflet"
import { Col, Row } from "react-bootstrap"
import { useFetch } from "./../hooks/UseFetch"

const Home = () => {
    // Tällä kiinnitetään jokaiseen "featureen" eli kuntaa edustavaan monikulmioon
    // klikattaessa ilmestyvä popup
    const addPopup = (feature, layer) => {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name)
        }
    }
    
    const res = useFetch("http://localhost:8000/api/maps/cityborders")
    

    if (res.isLoading) {
        return <div>Loading map data...</div>
    }
    if (!res.isLoading && res.error === null) {
        return (
            <Row>
                <Col>
                    <Map center={[65.1, 25.489]} preferCanvas={true} zoom={5}>
                        <GeoJSON
                            keyFunction={res.data}
                            data={res.data}
                            onEachFeature={addPopup}
                            style={() => ({
                                color: "#4a83ec",
                                weight: 0.75,
                                fillColor: "#18447e",
                                fillOpacity: 1
                            })}
                        />
                    </Map>
                </Col>
                <Col>
                Insert some information here
                </Col>
            </Row>
        )
    } else return (<div>Error</div>)
}


export default Home
