import * as arrayHelper from "../utils/arrayHelper"

test("Testing calculating sum of array", () => {
    expect(arrayHelper.sumArray([1,2,3]))
        .toStrictEqual(6)
    expect(arrayHelper.sumArray([]))
        .toStrictEqual(0)
    expect(arrayHelper.sumArray([{}]))
        .toStrictEqual(0)
    expect(arrayHelper.sumArray([{}, 5, "5"]))
        .toStrictEqual(5)
    expect(arrayHelper.sumArray([5, "asd", 2.5]))
        .toStrictEqual(7.5) 
})