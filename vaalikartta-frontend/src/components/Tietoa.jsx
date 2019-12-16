import React from "react"
import { Table } from "react-bootstrap"

const Tietoa = () => {
    return (
        <div>
            <h1>Tietoa sovelluksesta</h1>
            <p>
                Jyväskylän Yliopiston Informaatioteknologiatiedekunnan TIEA207 Aineopintojen projektikurssi, jossa
                avointa dataa hyödyntäen on luotu web-sivusto, jossa voi katsoa interaktiivisen kartan avulla Suomen
                eduskuntavaalien tuloksia koko maan, vaalipiirien ja kuntien osalta vuodesta 1983 alkaen. Lisäksi
                kultakin vuodelta voi tarkastella hallituksen kokoonpanoa.{" "}
                <a href="https://github.com/kjoonas1/Vaalikartta">Projektin lähdekoodi Githubissa</a>
            </p>
            <h2>Lisenssi</h2>
            <p>
                Tämän projektin lisenssi on{" "}
                <a href="https://github.com/kjoonas1/Vaalikartta/blob/master/LICENSE">GPLv3</a>.
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
                        <td>
                            Eduskuntavaalien{" "}
                            <a href="http://pxnet2.stat.fi/PXWeb/pxweb/fi/StatFin/StatFin__vaa__evaa__evaa_as/010_evaa_2019_tau_110.px/">
                                äänestystiedot
                            </a>{" "}
                            ja{" "}
                            <a href="http://pxnet2.stat.fi/PXWeb/pxweb/fi/StatFin/StatFin__vaa__evaa__evaa_as/020_evaa_2019_tau_120.px/">
                                puoluekannatukset
                            </a>
                            , Tilastokeskus
                        </td>
                        <td>18.10.2019</td>
                        <td>
                            <a href="https://creativecommons.org/licenses/by/4.0/deed.fi?_ga=2.218811536.880534282.1576159684-1137257823.1571741606">
                                CC BY 4.0
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="https://pxnet2.stat.fi/PXWeb/pxweb/fi/Kuntien_avainluvut/Kuntien_avainluvut__2019/kuntien_avainluvut_2019_aikasarja.px/?rxid=444223df-f91c-4479-891f-5dcd50b983d2">
                                Kuntien avainluvut
                            </a>
                            , Tilastokeskus
                        </td>
                        <td>31.10.2019</td>
                        <td>
                            <a href="https://creativecommons.org/licenses/by/4.0/deed.fi?_ga=2.218811536.880534282.1576159684-1137257823.1571741606">
                                CC BY 4.0
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Kuntakartan tausta, <a href="https://www.openstreetmap.org/copyright">Openstreetmap</a>
                        </td>
                        <td></td>
                        <td>
                            <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0</a>{" "}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="https://fi.wikipedia.org/wiki/Luettelo_Suomen_kuntien_koordinaateista">
                                Kuntien koordinaatit
                            </a>
                            , Wikipedia
                        </td>
                        <td>22.10.2019</td>
                        <td>
                            <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>
                        </td>
                    </tr>
                    <p></p>
                   
                        <p><strong>Pääministerien kuvat, Wikipedia:</strong></p>
                        
                    <tr>
                        <td>
                            <a href="https://fi.m.wikipedia.org/wiki/Tiedosto:Esko_Aho_2010-05-28.jpg"> Aho </a>
                        </td>
                        <td></td>
                        <td>
                            <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0</a>{" "}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="https://fi.m.wikipedia.org/wiki/Tiedosto:Harri-Holkeri-1981.jpg"> Holkeri</a>,
                            <a href="https://fi.m.wikipedia.org/wiki/Tiedosto:Antti_Rinne.jpg"> Rinne</a>,
                            <a href="https://fi.m.wikipedia.org/wiki/Tiedosto:Kalevi-Sorsa-1975.jpg"> Sorsa</a>
                        </td>
                        <td></td>
                        <td>
                            <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY 4.0</a>
                        </td>
                    </tr>
                            
                    <tr>
                        <td>
                            <a href="https://fi.m.wikipedia.org/wiki/Tiedosto:Anneli_J%C3%A4%C3%A4tteenm%C3%A4ki_2014-04-06_(3).jpg"> Jäätteenmäki </a>
                        </td>
                        <td></td>
                        <td>
                            <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="https://commons.wikimedia.org/wiki/File:Jyrki_Katainen_A4.jpeg"> Katainen</a>,
                            <a href="https://fi.m.wikipedia.org/wiki/Tiedosto:Tallinn_Digital_Summit._Handshake_Juha_Sipil%C3%A4_(2017).jpg"> Sipilä</a>,
                            <a href="https://fi.m.wikipedia.org/wiki/Tiedosto:Alexander_Stubb_EPP_October_2018_(44474967285)_(cropped).jpg"> Stubb</a>
                        </td>
                        <td></td>
                        <td>
                            <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <a href="https://fi.m.wikipedia.org/wiki/Tiedosto:Mari_Kiviniemi_2010-11-02_(2).jpg"> Kiviniemi</a>,
                            <a href="https://fi.m.wikipedia.org/wiki/Tiedosto:Paavo_Lipponen_2004.jpg"> Lipponen</a>
                        </td>
                        <td></td>
                        <td>
                            <a href="https://creativecommons.org/licenses/by/2.5/dk/">CC BY 2.5 DK</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="https://fi.wikipedia.org/wiki/Tiedosto:Matti_Vanhanen_2017_09.jpg"> Vanhanen</a>
                        </td>
                        <td></td>
                        <td>
                            <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <a href="https://fi.m.wikipedia.org/wiki/Tiedosto:Sanna_Marin_(cropped).jpg"> Marin</a>
                        </td>
                        <td></td>
                        <td>
                            public domain
                        </td>
                    </tr>
                        
                            
                    <p></p>
                </tbody>
            </Table>
            <h3>Dataan tehdyt muutokset</h3>
            <p>
                Tilastokeskukselta data ladattiin CSV-formaatissa ja siitä poistettiin tyhjiä kenttiä, minkä jälkeen se
                muutettiin JSON-formaattiin.
            </p>
            <h2>Tekijät</h2>
            <ul>
                <li>Joonas Kallinen</li>
                <li>Aleksi Tarvainen</li>
                <li>Juuso Huurinainen</li>
                <li>Teemu Korhonen</li>
            </ul>
        </div>
        
    )
}

export default Tietoa
