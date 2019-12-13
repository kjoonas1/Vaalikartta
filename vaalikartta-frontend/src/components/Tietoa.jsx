import React from "react"
import { Table } from "react-bootstrap"

const Tietoa = () => {
    return <div>
        <h1>Tietoa sovelluksesta</h1>
        <p>
            Jyväskylän Yliopiston Informaatioteknologiatiedekunnan TIEA207 Aineopintojen
            projektikurssi, jossa avointa dataa hyödyntäen on luotu web-sivusto, jossa voi katsoa
            interaktiivisen kartan avulla Suomen eduskuntavaalien tuloksia koko maan,
            vaalipiirien ja kuntien osalta vuodesta 1983 alkaen. Lisäksi kultakin vuodelta
            voi tarkastella hallituksen kokoonpanoa. <a href="https://github.com/kjoonas1/Vaalikartta">Projektin lähdekoodi Githubissa</a>
        </p>
        <h2>Lisenssi</h2>
        <p>
            Tämän projektin lisenssi on GPLv3.
            </p>


        <h2>Lähteet</h2>
        <Table size="sm">
            <thead>
                <tr>
                    <th>Lähde</th>
                    <th>Haettu</th>
                    <th>Lisenssi</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Eduskuntavaalien äänestystiedot ja puoluekannatukset, Tilastokeskus</td>
                    <td>18.10.2019</td>
                    <td><a href="https://creativecommons.org/licenses/by/4.0/deed.fi?_ga=2.218811536.880534282.1576159684-1137257823.1571741606">CC BY 4.0</a></td>
                </tr>
                <tr>
                    <td>Kuntien avainluvut, Tilastokeskus</td>
                    <td>31.10.2019</td>
                    <td><a href="https://creativecommons.org/licenses/by/4.0/deed.fi?_ga=2.218811536.880534282.1576159684-1137257823.1571741606">CC BY 4.0</a></td>
                </tr>
                <tr>
                    <td>Kuntakartan tausta, <a href="https://www.openstreetmap.org/copyright">Openstreetmap</a></td>
                    <td></td>
                    <td><a href="https://creativecommons.org/licenses/by-sa/2.0/" >CC BY-SA</a> </td>
                </tr>
                <p>
                    Kuntien koordinaatit.Wikipedia.Aineisto on haettu 22.10.2019 lisenssillä CC BY SA 4.0. Kuvat.Wikipedia.Aineisto on haettu Wikipediasta lisenssillä CC BY 2.0.
</p>
            </tbody>
        </Table>
        <h3>Dataan tehdyt muutokset</h3>
        <p>
            Tilastokeskukselta data ladattiin CSV-formaatissa ja siitä poistettiin tyhjiä kenttiä, minkä jälkeen se muutettiin JSON-formaattiin.
            </p>
        <p>
            Kuntien koordinaatit.Wikipedia.Aineisto on haettu 22.10.2019 lisenssillä CC BY SA
            4.0. Kuvat.Wikipedia.Aineisto on haettu Wikipediasta lisenssillä CC BY 2.0.
</p>


        <h2>Tekijät</h2>
        <ul>
            <li>Joonas Kallinen</li>
            <li>Aleksi Tarvainen</li>
            <li>Juuso Huurinainen</li>
            <li>Teemu Korhonen</li>
        </ul>
    </div>
}

export default Tietoa
