const supertest = require("supertest")
const app = require("../src/app")
const http = require("http")
const express = require("express")

let server
let request
beforeAll(async done => {
    const appInstance = await app.createApp
    server = http.createServer(appInstance)
    server.listen(done)
    request = supertest(server)
})

afterAll(done => {
    server.close(done)
})

test("sup", async (done) => {

    const res = await request.get("/")
    expect(res.status).toBe(200)
    done()
})

test("2", async done => {
    const res = await request.get("/api/vaalipiirit/kannatus/Lapin vaalipiiri/2011")
    expect(res.status).toBe(200)
    done()
})