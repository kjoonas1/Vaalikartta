import React, { useState, useContext } from "react"
import { Tabs, Tab } from "react-bootstrap"
import { AreaContext } from "../contexts/Contexts"

export const ControlledTabs = props => {
    const { area } = useContext(AreaContext)
    const [key, setKey] = useState(props.tabs[0].name)
    const tabs = Object.keys(props.tabs).map((key, index) => {
        return (
            <Tab eventKey={props.tabs[key].name} title={props.tabs[key].name} key={index}>
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
                }}>
                {tabs}
            </Tabs>
        </>
    )
}
