## Vaalikartta

Jyväskylän Yliopiston Informaatioteknologiatiedekunnan TIEA207-kurssin projekti, jossa avointa dataa hyödyntäen on luotu web-sivusto, jossa voi katsoa interaktiivisen kartan avulla Suomen eduskuntavaalien tuloksia vaalipiirien ja kuntien mukaan vuodesta 1983 alkaen.

## Aloitus

Kopion projektista saa komennolla:

 `git clone https://github.com/kjoonas1/Vaalikartta`

### Esiasetukset

Tarvitsee asentaa Git-sovelluksen, jotta ylläoleva komento toimii.

### Asentaminen

Jotta sovelluksen voi ajaa, nodejs täytyy olla asennettuna. Lisäksi backend- ja frontend-kansioihin tarvitsee asentaa modulit komennolla
`npm install`

### Ajaminen

Jotta backend toimii niin tarvitaan MongoDB:n salasana: `vaalit2019`

Sovellus käynnistetään ajamalla backend-kansiossa komento

`PASSWD=vaalit2019 npm start`

ja vaalikartta-frontend-kansiossa komento

`npm start`

## Testaus

Testit voi ajaa backend- ja vaalikartta-frontend -kansioissa komennolla

 `npm test`


## Luotu käyttäen seuraavia työkaluja

* Visual Studio Code
* JavaScript
* React
* d3
* node.js
* npm
* MongoDB
* OpenStreetmap
* Tilastokeskuksen avoin data

## Tekijät

* **Aleksi Tarvainen**
* **Joonas Kallinen**
* **Juuso Huurinainen**
* **Teemu Korhonen**

## Lisenssi

Tämän projektin lisenssi on GPLv3. Katso [LICENSE](LICENSE)-tiedostosta lisätietoja.

## Huomioita

* Inspiraatio haettu vapaasta ideoinnista, joka hyödyntää avointa dataa. Päädyimme ideoinnin päätteeksi politiikkaan liittyvään aiheeseen. Avoin data hankittu Tilastokeskukselta.
* Sovellus on kohdennettu Suomen politiikasta ja sen historiasta kiinnostuneille. Sovellusta voisi käyttää oppilaitoksissa interaktiivisena työkaluna esimerkiksi historian tai yhteiskuntaopin oppiaineissa.