import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup } from "@testing-library/react"
import { Timeline } from "../components/Timeline"
import { timelineData } from "../dataset/timelineData"
import { YearContext, EventContext } from "../Contexts"
import { BrowserRouter as Router } from "react-router-dom"

afterEach(cleanup)

describe("Timeline", () => {
    it("should contain years included in timeline data", () => {
        const data = timelineData
        const component = render(
            <Router>
                <YearContext.Provider value={{ year: 1983 }}>
                    <EventContext.Provider
                        value={{
                            name: "Neuvostoliiton hajoaminen",
                            year: 1991
                        }}
                    >
                        <Timeline data={data} />
                    </EventContext.Provider>
                </YearContext.Provider>
            </Router>
        )
        expect(component.container.textContent).toBe(timelineData.years.join(""))
    })
})
