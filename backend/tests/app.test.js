const supertest = require("supertest")
const { createApp } = require("../src/app")
const http = require("http")

let server
let request
beforeAll(async done => {
    const app = await createApp
    server = http.createServer(app)
    server.listen(done)
    request = supertest(server)
})

afterAll(done => {
    server.close(done)
})

describe("Vaalipiirien kannatus", () => {
    const vaalipiirit = "/api/vaalipiirit/kannatus"
    test("saadaan tiedot, jos niitä on", done => {
        request.get(`${vaalipiirit}/Lapin vaalipiiri/2011`)
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Content-Length", "487")
            .end(done)
    })

    test("Olemattomien vaalipiirien tapauksessa palautetaan tyhjä taulukko", done => {
        request.get(`${vaalipiirit}/Kouvostoliiton vaalipiiri/2019`)
            .expect("Content-Type", /application\/json/)
            .expect("Content-Length", "2")
            .end(done)
    })
})

describe("Kuntien kannatus", () => {
    const kunnat = "/api/kunnat/kannatus"
    test("saadaan tiedot, jos olemassa", done => {
        request.get(`${kunnat}/Polvijärvi/1987`)
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Content-Length", "484")
            .end(done)
    })

    test("Olemattomien kuntien tapauksessa palautetaan tyhjä taulukko", done => {
        request.get(`${kunnat}/Muumilaakso/2019`)
            .expect("Content-Type", /application\/json/)
            .expect("Content-Length", "2")
            .end(done)
    })

    test("Olemassa olevien kuntien mutta olemattomien vuosien tapauksessa palautetaan tyhjä taulukko", done => {
        request.get(`${kunnat}/Polvijärvi/1988`)
            .expect("Content-Type", /application\/json/)
            .expect("Content-Length", "2")
            .end(done)
    })
})

describe("Kuntien koordinaatit", () => {
    test("Vaalivuodelta saadaan koordinaatit", done => {
        request.get("/api/kunnat/koordinaatit/1991")
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Content-Length", "88696")
            .end(done)
    })

    test("Jos vaalivuosi väärin palautetaan HTTP 404", done => {
        request.get("/api/kunnat/koordinaatit/1990")
            .expect(404)
            .end(done)
    })
})

describe("Kuntien avainluvut", () => {
    test("Dataa saadaan", done => {
        request.get("/api/avainluvut/2011/Äänekoski")
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Content-Length", "303")
            .end(done)
    })

    test("Olemattomista kunnista tulee HTTP 404", done => {
        request.get("/api/avainluvut/2011/Kuusniemi")
            .expect(404)
            .end(done)
    })

    test("Muilta kuin vaalivuosilta välillä 1987-2018 palautetaan HTTP 404", done => {
        request.get("/api/avainluvut/1983/Helsinki")
            .expect(404)
            .end(done)
    })
})

describe("Kuntien aanestystiedot", () => {
    test("Dataa saadaan", done => {
        request.get("/api/kunnat/aanestystiedot/Helsinki/2015")
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Content-Length", "228")
            .end(done)
    })

    test("Olemattomista kunnista tulee HTTP 404", done => {
        request.get("/api/kunnat/aanestystiedot/Muumilaakso/2015")
            .expect(404)
            .end(done)
    })

    test("Jos väärä vaalivuosi niin palautetaan HTTP 404", done => {
        request.get("/api/kunnat/aanestystiedot/Helsinki/2014")
            .expect(404)
            .end(done)
    })
})

describe("Vaalipiirien aanestystiedot", () => {
    test("Dataa saadaan", done => {
        request.get("/api/vaalipiirit/aanestystiedot/Helsingin%20vaalipiiri/2019")
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Content-Length", "240")
            .end(done)
    })

    test("Olemattomista vaalipiireistä tulee HTTP 404", done => {
        request.get("/api/vaalipiirit/aanestystiedot/Muumilaakso/2019")
            .expect(404)
            .end(done)
    })

    test("Jos väärä vaalivuosi niin palautetaan HTTP 404", done => {
        request.get("/api/vaalipiirit/aanestystiedot/Helsingin%20vaalipiiri/2018")
            .expect(404)
            .end(done)
    })
})

describe("Muiden alueiden aanestystiedot", () => {
    test("Dataa saadaan", done => {
        request.get("/api/muut-alueet/aanestystiedot/Suomessa%20asuvat%20Suomen%20kansalaiset/2003")
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Content-Length", "254")
            .end(done)
    })

    test("Olemattomista alueista tulee HTTP 404", done => {
        request.get("/api/muut-alueet/aanestystiedot/Muumilaaksossa%20asuvat%20Muumilaakson%20kansalaiset/2003")
            .expect(404)
            .end(done)
    })

    test("Jos väärä vaalivuosi niin palautetaan HTTP 404", done => {
        request.get("/api/muut-alueet/aanestystiedot/Suomessa%20asuvat%20Suomen%20kansalaiset/2002")
            .expect(404)
            .end(done)
    })
})