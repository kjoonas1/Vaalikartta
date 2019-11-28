import * as objectHelper from "../utils/objectHelper"

test("Test object identifier", () => {
    expect(objectHelper.isObject({a: "1"})).toBe(true)
    expect(objectHelper.isObject({})).toBe(true)
    expect(objectHelper.isObject([])).toBe(false)
    expect(objectHelper.isObject(1)).toBe(false)
    expect(objectHelper.isObject("{}")).toBe(false)
})

test("Test object filtering", () => {
    expect(objectHelper.filterFromObject({a: null}, a => a !== null)).toStrictEqual({})
    expect(objectHelper.filterFromObject({a: null, b: "x"}, a => a !== null)).toStrictEqual({b: "x"})
    expect(objectHelper.filterFromObject({a: null, b: "x", c: null}, a => a === null)).toStrictEqual({a: null, c: null})
    expect(objectHelper.filterFromObject({a: null, b: 1}, a => a > 0)).toStrictEqual({b: 1})
})

test("Testing data extracting to array", () => {
    const byPass = ["a", "b"]
    expect(objectHelper.extractArrayOfResponseData({"a": 1, "b": [], "c": 123}, byPass, "key", "value"))
        .toStrictEqual([{"key": "c", "value": 123}])
})

test("All object helper's methods combined", () => {
    const object = {a: 1, b: "asd", c: [1,2,3]}
    expect(objectHelper.isObject(object)).toBe(true)
    const filtered = objectHelper.filterFromObject(object, a => isNaN(a))
    expect(filtered).toStrictEqual({b: "asd", c: [1,2,3]})
    expect(objectHelper.extractArrayOfResponseData(filtered, ["a", "c"], "k", "v"))
        .toStrictEqual([{"k": "b", "v": "asd"}])
})