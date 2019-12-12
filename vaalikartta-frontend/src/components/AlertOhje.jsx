import React from "react"
import { Alert } from "react-bootstrap"
import { useOhje } from "../contexts/OhjeContextProvider"


const AlertOhje = () => {
    const {show, setShow} = useOhje()
    const setTo = (value) => setShow(value)
    if (show) {
        return (
            <Alert variant="info" onClose={() => setTo(false)} dismissible>
                <Alert.Heading>Ohjeet</Alert.Heading>
                <p>
                    Aikajanalta voi valita eduskuntavaalivuoden, jonka tilastoja ja hallitusta haluaa tarkastella.
                   Koko maa -välilehti näyttää koko maan puoluekannatuksen ja äänestystiedot.
                   Vaalipiirit-välilehti näyttää vaalipiireittäin puoluekannatuksen ja äänestystiedot.
                   Kunnat-välilehti näyttää interaktiivisen kartan, jota voi liikuttaa, lähentää ja loitintaa haluamaansa kohteeseen.
                   Kunnista voi tarkastella puoluekannatuksen, äänestystiedot ja kuntatiedot. Kuntaliitokset on otettu huomioon.
                </p>
            </Alert>
        )
    }
    return null
}
export default AlertOhje