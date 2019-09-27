import React, { Fragment } from "react";
import { useFetch } from '.././hooks/UseFetch'
import shortid from 'shortid';


// Komponentti hakee backendistä helloworldin ja näyttää sen selaimessa
const Home = () => {
    const url = "http://localhost:8000/api/helloworld"
    const data = useFetch(url)

    return (
        <Fragment>
            {data.map(({id, content}) => (
                <li key={shortid.generate()}>{content}</li>
            ))}
        </Fragment>
    );
}

export default Home;