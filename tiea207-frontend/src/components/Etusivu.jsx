
import React, { Fragment, useContext } from "react"
import { Map, GeoJSON } from "react-leaflet"
import { Col, Row } from "react-bootstrap"
import { useFetch } from "../hooks/UseFetch"
import { ReactComponent as Timeline } from "../vuosijana.svg"
import chart from "../chart.png"
import { AreaContext } from "../Contexts"


const Etusivu = () => {

    const { area, setArea } = useContext(AreaContext)
    // Tällä kiinnitetään jokaiseen "featureen" eli kuntaa edustavaan monikulmioon
    // klikattaessa ilmestyvä popup
    const addAreaInfo = (feature, layer) => {
        if (feature.properties && feature.properties.name) {
            layer.on({
                click: (event) => setArea(event.target.feature.properties.name)
            });
        }
    }
    
      
    const res = useFetch("http://localhost:8000/api/maps/municipalityborders")

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
                        <Map center={[65.1, 25.489]} dragging={false} preferCanvas={true}  zoom={5}>
                            <GeoJSON
                                keyFunction={res.data}
                                data={res.data}
                                onEachFeature={addAreaInfo}
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
                        <p>{area}</p>
                        <img src={chart} width="100%" alt="Pylväsdiagrammi"/>
                    </Col>
                </Row>
            </Fragment>
        )
    } else return (<div>Error</div>)
}


export default Etusivu
