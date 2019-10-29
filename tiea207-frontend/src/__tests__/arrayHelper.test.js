import * as arrayHelper from "../utils/arrayHelper"

describe("calculating sum of array", () => {
    test("does what it says", () => {
        expect(arrayHelper.sumArray([1, 2, 3]))
            .toStrictEqual(6)
    })
    test("every non-number object returns 0", () => {
        expect(arrayHelper.sumArray([]))
            .toStrictEqual(0)
        expect(arrayHelper.sumArray([{}]))
            .toStrictEqual(0)
        expect(arrayHelper.sumArray([{}, 5, "5"]))
            .toStrictEqual(5)
        expect(arrayHelper.sumArray([5, "asd", 2.5]))
            .toStrictEqual(7.5)
    })
})

describe("partitioning", () => {
    test("works", () => {
        expect(arrayHelper.partition([1, 2, 3, 4, 5], val => val < 3))
            .toEqual([[1, 2], [3, 4, 5]])
    })

    test("handles empty array", () => {
        expect(arrayHelper.partition([], val => val))
            .toEqual([[], []])
    })

    test("works with objects too", () => {
        expect(arrayHelper.partition([{ a: 2 }, { a: 3, b: 8 }, { a: -200 }], val => val.a < 0))
            .toEqual([[{ a: -200 }], [{ a: 2 }, { a: 3, b: 8 }]])
    })
})