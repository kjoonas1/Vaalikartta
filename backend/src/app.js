const express = require("express")
const app = express()
var cors = require("cors")

app.use(cors())

const PORT = 8000

const message = {
    id: 1,
    content: "Hello world"
}

app.get("/api/helloworld", (req, res) => {
    res.send(JSON.stringify(message))
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})