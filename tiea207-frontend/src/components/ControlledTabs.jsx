import React, { useState, useContext } from "react"
import { Tabs, Tab } from "react-bootstrap"
import { AreaContext } from "../contexts/Contexts"

export const ControlledTabs = props => {
    const { dispatchArea } = useContext(AreaContext)
    const [key, setKey] = useState(props.tabs[0].name)
    const tabs = Object.keys(props.tabs).map((key, index) => {
        return (
            <Tab eventKey={props.tabs[key].name} title={props.tabs[key].name} key={index}>
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
                    dispatchArea({type: "CHANGE_ACTIVE_TO", to: k})
                }}>
                {tabs}
            </Tabs>
        </>
    )
}
