import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup, fireEvent } from "@testing-library/react"
import { Timeline } from "../components/Timeline"
import { timelineData } from "../dataset/timelineData"
import { BrowserRouter as Router } from "react-router-dom"
import YearContextProvider from "../contexts/YearContextProvider"
import EventContextProvider from "../contexts/EventContextProvider"

afterEach(cleanup)

describe("Timeline", () => {
    it("should contain years included in timeline data", () => {
        const data = timelineData
        const component = render(
            <Router>
                <YearContextProvider>
                    <EventContextProvider>
                        <Timeline data={data} />
                    </EventContextProvider>
                </YearContextProvider>
            </Router>
        )
        expect(component.container.textContent).toContain(timelineData.years.join(""))

        const button = component.getByTestId("event-link-0")
        fireEvent.click(button)
        expect(component.container.textContent).toContain(timelineData.events[0].name)
    })
})
