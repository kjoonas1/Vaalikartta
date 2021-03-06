import React, { useState } from "react"
import { Tabs, Tab } from "react-bootstrap"
import { useArea } from "../contexts/AreaContextProvider"

export const ControlledTabs = props => {
    const { area, dispatchArea } = useArea()
    const [key, setKey] = useState(props.tabs[0].name)
    const tabs = Object.keys(props.tabs).map((key, index) => {
        return (
            <Tab eventKey={props.tabs[key].name} title={props.tabs[key].name} key={index}
                data-testid={"tab-" + props.tabs[key].name}>
                {area === null && <p>Valitse alue kartalta</p>}
                {props.tabs[key].map}
            </Tab>
        )
    })

    return (
        <>
            <Tabs
                className="controlled-tab"
                activeKey={key}
                onSelect={k => {
                    setKey(k)
                    dispatchArea({ type: "CHANGE_ACTIVE_TO", to: k })
                    window.dispatchEvent(new Event("resize"))
                }}>
                {tabs}
            </Tabs>
        </>
    )
}
