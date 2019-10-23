const { readFileSync, writeFileSync } = require("fs")

const lines = readFileSync("./kunta-vaalipiiri-luokitusavain-2019.txt", "utf-8").split("\n")
const numberPairs = lines.reduce((acc, line) => {
    return [...acc, line.match(/\d+/g).map(num => parseInt(num))]
}, [])
const districtConstituencyKeyObjects = numberPairs.map(pair => ({kuntanumero: pair[0], vaalipiirinumero: pair[1], vuosi: 2019}))

writeFileSync("kunta-vaalipiiri-luokitusavain-2019.json", JSON.stringify(districtConstituencyKeyObjects), "utf-8")
