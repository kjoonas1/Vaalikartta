import React, { Fragment } from "react";
import { useFetch } from '.././hooks/UseFetch'
import shortid from 'shortid';


// Komponentti hakee backendistä helloworldin ja näyttää sen selaimessa
const TestContent = () => {
    const data = 
    [
        {
            id:1,
            content:"test"
        },
        {
            id:2,
            content:"hello"
        },
    ]

    return (
        <Fragment>
            {data.map(({id, content}) => (
                <li key={shortid.generate()}>{content}</li>
            ))}
        </Fragment>
    );
}

export default TestContent;