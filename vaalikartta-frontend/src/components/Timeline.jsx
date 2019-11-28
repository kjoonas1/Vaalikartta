import React, { Fragment } from "react"
import { Col } from "react-bootstrap"
import shortid from "shortid"
import "../styles/Timeline.scss"
import { useYear } from "../contexts/YearContextProvider"
import { useEvent } from "../contexts/EventContextProvider"
import { timelineData } from "../dataset/timelineData"
import { Link } from "react-router-dom"

export const Timeline = props => {
    const { year, setYear } = useYear()
    const { event, setEvent } = useEvent()
    const padding = 10
    const mainLineHeight = "6em"
    const activeColor = "#404040"
    const inactiveColor = "#757575"
    const circleColor = "#5289ff"

    return (<>
        <Col md={{ span: 12 }}>
            <svg
                key={shortid.generate()}
                viewBox={"0 0 2800 250"}
                width={"100%"}
                display="block"
                margin="0, auto"
                className="timeline-container"
            >
                {timelineData.years.map((_year, index) => {
                    const x = (100 - 2 * padding) * (index / (timelineData.years.length - 1)) // Vaakaviivojen ja tekstin paikka, jossa ei vielä huomioida paddingia
                    const lineX = (padding + x).toString()
                    const bolding = year === _year ? "bold" : "normal"
                    return (
                        <Fragment key={shortid.generate()}>
                            <Link
                                key={shortid.generate()}
                                to=""
                                onClick={() => {
                                    props.chartsRef.current.scrollIntoView({behavior: "smooth", block: "start"})
                                    if (year !== _year) {
                                        setYear(_year)
                                    }
                                }}
                            >
                                <line
                                    key={shortid.generate()}
                                    x1={lineX + "%"}
                                    y1={mainLineHeight}
                                    x2={lineX + "%"}
                                    y2="4em"
                                    className="timeline-line"
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
                                    {_year}
                                </text>
                            </Link>
                        </Fragment>
                    )
                })}
                {timelineData.events.map((_event, index) => {
                    const minYear = Math.min(...timelineData.years)
                    const maxYear = Math.max(...timelineData.years)
                    const x = padding + ((100 - 2 * padding) * (_event.year - minYear)) / (maxYear - minYear)
                    const isActive = JSON.stringify(_event) === JSON.stringify(event)
                    const eventActiveness = {
                        fill: isActive ? "1" : "0.6",
                        size: isActive ? "1.75em" : "1.5em",
                        borderColor: isActive ? activeColor : inactiveColor
                    }
                    return (
                        <Fragment key={shortid.generate()}>
                            <Link
                                to=""
                                onClick={() => {
                                    // Pallon uudelleenklikkaus poistaa aktivoinnin
                                    isActive ? setEvent(null) : setEvent(_event)
                                }}
                            >
                                <line
                                    key={shortid.generate()}
                                    x1={x + "%"}
                                    y1={mainLineHeight}
                                    x2={x + "%"}
                                    y2="8em"
                                    className="event timeline-line"
                                    style={{
                                        strokeLinecap: "round",
                                        strokeWidth: "0.25em"
                                    }}
                                />
                                <filter id="dropshadow" height="130%">
                                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                                    <feOffset dx="2" dy="2" result="offsetblur" />
                                    <feComponentTransfer>
                                        <feFuncA type="linear" slope="0.2" />
                                    </feComponentTransfer>
                                    <feMerge>
                                        <feMergeNode />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <circle
                                    data-testid={"event-link-" + index}
                                    stroke={eventActiveness.borderColor}
                                    fillOpacity={eventActiveness.fill}
                                    strokeWidth="2"
                                    className="event timeline-event-circle"
                                    fill={circleColor}
                                    cx={x + "%"}
                                    cy="9.5em"
                                    r={eventActiveness.size}
                                ></circle>
                            </Link>
                            {isActive && (
                                <text className="timeline-event-text" textAnchor="middle" key={shortid.generate()} y="3em" x={x + "%"}>
                                    {event.name}
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
                    className="timeline-mainline"
                />
            </svg>
        </Col>
    </>
    )
}
