import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import { Timeline } from "../components/Timeline"
import { timelineData } from "../dataset/timelineData"
import { BrowserRouter as Router } from "react-router-dom"
import YearContextProvider from "../contexts/YearContextProvider"
import EventContextProvider from "../contexts/EventContextProvider"




describe("Timeline", () => {
    const component = () => render(
        <Router>
            <YearContextProvider>
                <EventContextProvider>
                    <Timeline data={timelineData} />
                </EventContextProvider>
            </YearContextProvider>
        </Router>
    )
    it("should contain years included in timeline data", () => {
        const c = component()
        expect(c.container.textContent).toContain(timelineData.years.join(""))
    })
    it("should contain event name after event is clicked, and disappear after reclick", () => {
        const c = component()
        const button = c.getByTestId("event-link-0")
        fireEvent.click(button)
        expect(c.container.textContent).toContain(timelineData.events[0].name)
        const buttonAfterClick = c.getByTestId("event-link-0")
        fireEvent.click(buttonAfterClick)
        expect(c.container.textContent).not.toContain(timelineData.events[0].name)
    })
})
