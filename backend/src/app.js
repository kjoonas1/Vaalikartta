const express = require("express")
const app = express()
var cors = require("cors")
const routes = require("./routes/routes")

app.use(cors())

const PORT = 8000

routes(app)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})