
import React, { Fragment } from "react"
import { Map, GeoJSON } from "react-leaflet"
import { Col, Row } from "react-bootstrap"
import { useFetch } from "../hooks/UseFetch"
import { ReactComponent as Timeline } from "../vuosijana.svg"
import chart from "../chart.png"


const Etusivu = () => {
    // Tällä kiinnitetään jokaiseen "featureen" eli kuntaa edustavaan monikulmioon
    // klikattaessa ilmestyvä popup
    const addPopup = (feature, layer) => {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name)
        }
    }

    const res = useFetch("http://localhost:8000/api/maps/provinceborders")

    if (res.isLoading) {
        return <div>Loading map data...</div>
    }
    if (!res.isLoading && res.error === null) {
        return (
            <Fragment>
                <Row className="timeline">
                    <Timeline width="100%" />
                </Row>
                <Row>
                    <Col xs={12} xl={4}>
                        <Map center={[65.1, 25.489]} dragging={false} preferCanvas={true} zoom={5}>
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
                    <Col xs={12} xl={8}>
                        <img src={chart} width="100%"/>
                    </Col>
                </Row>
            </Fragment>
        )
    } else return (<div>Error</div>)
}


export default Etusivu
