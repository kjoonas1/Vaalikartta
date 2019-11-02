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
})

describe("Kuntien koordinaatit", () => {
    test("Vaalivuodelta saadaan koordinaatit", done => {
        request.get("/api/kunnat/koordinaatit/1991")
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Content-Length", "88696")
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
