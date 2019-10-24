const supertest = require("supertest")
const app = require("../src/app")
const http = require("http")
const express = require("express")

let server
let request
let expApp
beforeAll(done => {
    expApp = express()
    expApp.get("/", (res, req) => req.send(200))
    server = http.createServer(app)
    server.listen(done)
    request = supertest(server)
    
})

afterAll(done => {
    server.close(done)
})

test("sup", async (done) => {

    const res = await request.get("/")
    // console.log(res)
    expect(res.status).toBe(200)
})

test("2", async done => {
    const res = await request.get("/api/vaalipiirit/kannatus/Lapin vaalipiiri/2011")
    expect(res.status).toBe(200)
})