import React, { Fragment } from "react"
import { Col } from "react-bootstrap"
import shortid from "shortid"
import { Link } from "react-router-dom"
import "../styles/Timeline.scss"
import { useYear } from "../contexts/YearContextProvider"
import { useEvent } from "../contexts/EventContextProvider"

export const Timeline = props => {
    const { year, setYear } = useYear()
    const { event, setEvent } = useEvent()

    const years = props.data.years
    const events = props.data.events

    const contextYear = year
    const contextEvent = event
    const padding = 10
    const mainLineHeight = "6em"
    const activeColor = "#404040"
    const inactiveColor = "#757575"
    const circleColor = "#fcb103"

    return (<>
        <Col md={{ span: 12 }}>
            <svg
                key={shortid.generate()}
                viewBox={"0 0 2400 250"}
                width={"100%"}
                display="block"
                margin="0, auto"
                className="timeline-container"
            >
                {years.map((year, index) => {
                    const x = (100 - 2 * padding) * (index / (years.length - 1)) // Vaakaviivojen ja tekstin paikka, jossa ei vielä huomioida paddingia
                    const lineX = (padding + x).toString()
                    const bolding = contextYear === year ? "bold" : "normal"
                    return (
                        <Fragment key={shortid.generate()}>
                            <Link
                                key={shortid.generate()}
                                to=""
                                onClick={() => {
                                    setYear(year)
                                }}
                            >
                                <line
                                    key={shortid.generate()}
                                    x1={lineX + "%"}
                                    y1={mainLineHeight}
                                    x2={lineX + "%"}
                                    y2="4em"
                                    style={{ stroke: activeColor, strokeLinecap: "round", strokeWidth: "0.5em" }}
                                />
                                <text
                                    textAnchor="middle"
                                    className="timeline-year"
                                    key={shortid.generate()}
                                    x={lineX + "%"}
                                    y="0.75em"
                                    fill={activeColor}
                                    fontWeight={bolding}
                                >
                                    {year}
                                </text>
                            </Link>
                        </Fragment>
                    )
                })}
                {events.map((event, index) => {
                    const minYear = Math.min(...years)
                    const maxYear = Math.max(...years)
                    const x = padding + ((100 - 2 * padding) * (event.year - minYear)) / (maxYear - minYear)
                    const isActive = JSON.stringify(event) === JSON.stringify(contextEvent)
                    const eventActiveness = {
                        fill: isActive ? "1" : "0.25",
                        size: isActive ? "1.75em" : "1.5em",
                        borderColor: isActive ? activeColor : inactiveColor
                    }
                    return (
                        <Fragment key={shortid.generate()}>
                            <Link

                                to=""
                                onClick={() => {
                                    // Pallon uudelleenklikkaus poistaa aktivoinnin
                                    isActive ? setEvent(null) : setEvent(event)
                                }}
                            >
                                <line
                                    className="event"
                                    key={shortid.generate()}
                                    x1={x + "%"}
                                    y1={mainLineHeight}
                                    x2={x + "%"}
                                    y2="8em"
                                    style={{
                                        stroke: eventActiveness.borderColor,
                                        strokeLinecap: "round",
                                        strokeWidth: "0.25em"
                                    }}
                                />
                                <circle
                                    data-testid={"event-link-" + index}
                                    className="event"
                                    stroke={eventActiveness.borderColor}
                                    fillOpacity={eventActiveness.fill}
                                    strokeWidth="2"
                                    fill={circleColor}
                                    cx={x + "%"}
                                    cy="9.5em"
                                    r={eventActiveness.size}
                                ></circle>
                            </Link>
                            {isActive && (
                                <text className="timeline-event-text" textAnchor="middle" key={shortid.generate()} y="3em" x={x + "%"}>
                                    {contextEvent.name}
                                </text>
                            )}
                        </Fragment>
                    )
                })}
                <line
                    key={shortid.generate()}
                    x1={padding + "%"}
                    y1={mainLineHeight}
                    x2={100 - padding + "%"}
                    y2={mainLineHeight}
                    style={{ stroke: activeColor, strokeWidth: "0.5em" }}
                />
            </svg>
        </Col>
    </>
    )
}
