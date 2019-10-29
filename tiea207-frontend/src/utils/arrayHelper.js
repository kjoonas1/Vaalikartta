
// Taulukon alkioiden summa. Tyypin tulee olla luku.
export const sumArray = (arr) => {
    const numMap = arr.map(a => typeof a == "number" ? a : 0)
    return numMap.reduce((a, b) => a + b, 0)
}

export const partition = (arr, predicate) => {
    return arr.reduce(
        ([lower, upper], value) =>
            predicate(value) ? [[...lower, value], upper] : [lower, [...upper, value]],
        [[], []])
}