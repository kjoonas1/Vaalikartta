const { createApp } = require("./app")
const http = require("http")

createApp.then(app => {
    const PORT = 8000
    const server = http.createServer(app)
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
