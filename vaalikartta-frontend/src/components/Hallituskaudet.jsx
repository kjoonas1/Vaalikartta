import React, { useState, useEffect } from "react"
import "../styles/Hallitustiedot.scss"
import { Tab, Tabs, Accordion, Card, ListGroup, ListGroupItem, Row, Col } from "react-bootstrap"


const Hallituskaudet = ({ data }) => {
    const [hallitusIndeksi, setHallitusIndeksi] = useState(data.length - 1)

    useEffect(() => setHallitusIndeksi(data.length - 1), [data])

    if (data.length !== 0) {
        return <Tabs defaultActiveKey={hallitusIndeksi} activeKey={hallitusIndeksi} variant="pills" onSelect={(k => setHallitusIndeksi(k))}>
            {
                data.map((hallitus, i) => {
                    return <Tab key={i} eventKey={i} title={hallitus.Hallitus} className="hallitus-tab">
                        <Row>
                            <Col md={4}>
                                <Card key={"hallitus" + i}>
                                    <Card.Img variant="top" className="paaministerikuva" src={hallitus.Kuva} alt="vanhanen vain nauroi" />
                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            <ListGroupItem><b>Alku: </b>{hallitus.Alku}</ListGroupItem>
                                            <ListGroupItem><b>Loppu:</b> {hallitus.Loppu}</ListGroupItem>
                                            <ListGroupItem><b>Hallituspäivät:</b> {hallitus["Hallituspäivät"]}</ListGroupItem>
                                            <ListGroupItem><b>Pääministerin puolue:</b> {hallitus["Pääministerin puolue"]}</ListGroupItem>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={8}>
                                <Accordion className="ministerit">
                                    {hallitus.ministerit.map((nimi, i) =>
                                        <Card key={nimi._id}>
                                            <Accordion.Toggle as={Card.Header} eventKey={i}><b>{nimi.Rooli}</b> {": " + nimi.Ministeri}</Accordion.Toggle>
                                            <Accordion.Collapse eventKey={i}><Card.Body>
                                                <ListGroup className="ministeri-sisalto" variant="flush">
                                                    <ListGroupItem>Nimitetty: {nimi.Nimitetty}</ListGroupItem>
                                                    {nimi.Eronnut !== "" ? <ListGroupItem>Eronnut: {nimi.Eronnut}</ListGroupItem> : null}
                                                    <ListGroupItem>Puolue: {nimi.Puolue}</ListGroupItem>
                                                </ListGroup>
                                            </Card.Body></Accordion.Collapse>
                                        </Card>)}
                                </Accordion>
                            </Col>
                        </Row>
                    </Tab>
                })
            }
        </Tabs>
    }
    else return null
}
export default Hallituskaudet