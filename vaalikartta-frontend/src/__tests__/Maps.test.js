import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent, waitForElement } from "@testing-library/react"
import App from "../App"
import { act } from "react-dom/test-utils"

/* const mockKannatukset = [{
    Alue: "Koko maa",
    Vuosi: 2019,
    SDP: 20,
    KOK: 20,
    Muut: 2
}]
 */
/* jest.mock("../hooks/UseFetch", () => ({
    useFetch: () => ({ data: mockKannatukset, error: null, isLoading: false })
})) */

describe("Landing on front page", () => {
    const component = () => render(
        <App />
    )

    it("should have 'Koko maa'-tab selected", () => {
        let attribute
        act(() => {
            const c = component()
            const selectedTab = c.getByTestId("tab-Koko maa")
            attribute = selectedTab.getAttribute("aria-hidden")
        })
        // console.log(selectedTab.getAttributeNames)
        expect(attribute).toBe("false")
    })

    it("should be able to switch tabs", async () => {
        let attribute
        await act(async () => {
            const c = component()
            const tabLink = c.getByText("Vaalipiirit")
            fireEvent.click(tabLink)
            const switchedToTab = await waitForElement(() => c.getByTestId("tab-Vaalipiirit"), {c})
            attribute = switchedToTab.getAttribute("aria-hidden")
        })
        expect(attribute).toBe("false")
    })
})