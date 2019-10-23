const supertest = require("supertest")
const app = require("../src/app")

const api = supertest(app)

test("hello", () => {
    expect(true).toBe(true)
    app.onExit()
})

test("Vaalipiireistä saadaan dataa", () => {
    api.get("/api/vaalipiirit/kannatus/Lapin vaalipiiri/2011")
        .then(res => expect(res.status).toBe(200))
})