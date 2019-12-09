import React, {useState} from "react"
import { Alert, Button } from "react-bootstrap"

const AlertOhje = () => {
    const [show, setShow] = useState(true)
    if (show) {
        return (
            <Alert variant="info" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Ohjeet</Alert.Heading>
                <p>
                    Aikajanalta voi valita eduskuntavaalivuoden, jonka tilastoja haluaa tarkastella.
                   Koko maa -välilehti näyttää koko maan puoluekannatuksen ja äänestystiedot.
                   Vaalipiirit-välilehti näyttää vaalipiireittäin puoluekannatuksen ja äänestystiedot.
                   Kunnat-välilehti näyttää interaktiivisen kartan, jota voi liikuttaa, lähentää ja loitintaa haluamaansa kohteeseen.
                   Kunnista voi tarkastella puoluekannatuksen, äänestystiedot ja kuntatiedot. Kuntaliitokset on otettu huomioon.
                </p>
            </Alert>
        )
    }
    return <Button onClick={() => setShow(true)}>Näytä ohje</Button>
}
//render(<AlertOhje/>)
export default AlertOhje