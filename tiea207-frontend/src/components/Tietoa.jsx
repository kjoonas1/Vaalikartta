/* import React, { Fragment } from "react"
import shortid from "shortid"
import { useFetch } from "../hooks/UseFetch" */
// Komponentti hakee backendistä helloworldin ja näyttää sen selaimessa
const Tietoa = () => {
    /*   const url = "http://localhost:8000/api/helloworld"
    const res = useFetch(url) */
/* 
    // Loading state
    if (res.isLoading && res.error === null) {
        return (
            <Fragment>
                <p>Loading..</p>
            </Fragment>
        )
    }

    // Error state
    if (res.error !== null) {
        return (
            <Fragment>
                <p>Loading data failed</p>
            </Fragment>
        )
    }

    // Normal state
    if (!res.isLoading && res.error === null) {
        return (
            <Fragment>
                {res.data.map(({ id, content }) => (
                    <li key={shortid.generate()}>{id + ": " + content}</li>
                ))}
            </Fragment>
        )
    } */ return null
}

export default Tietoa
