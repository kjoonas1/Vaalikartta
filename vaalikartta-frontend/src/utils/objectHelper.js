export const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === "[object Object]"
}

// Suodattaa predikaatin mukaan objektin
export const filterFromObject = (obj, pred) => {
    if (isObject(obj)) {
        return Object.entries(obj)
            .reduce((res, [key, val]) => pred(val) ? {...res, [key]: val} : res, {})
    }
    return {}
}

// Siivoaa objektin avaimista bypassKeys listan sisältämät arvot ja palauttaa tiedot listana
export const extractArrayOfResponseData = (obj, bypassKeys, keyName, keyValue) => {
    if (isObject(obj)) {
        return Object.entries(obj)
            .reduce((acc, [key, val]) => {
                return bypassKeys.includes(key) ? acc : [...acc, { [keyName]: key, [keyValue]: val }]
            }, [])
    }
    return []
} 