import React, { useState} from "react"
import "../styles/Hallitustiedot.scss"
import { useQuery } from "react-fetching-library"


const Hallituskaudet = ({data}) => {

    const paaministerit = ["/sorsa.jpg", "/holkeri.jpg", "/aho.jpg", "/lipponen.jpg", "/lipponen.jpg", "/jaatteenmaki.jpg", "/vanhanen.jpg", "/vanhanen.jpg", "/kiviniemi.jpg", "/katainen.jpg", "/stubb.jpg", "/sipila.jpg", "/rinne.jpg"]

    let sortatutMinisterit = []
    const [ counter, setCounter ] = useState(0)
    
    let apu = parseInt(data.map(id => id.ID)) + counter
    if (isNaN(apu))
        apu = 0
    


    const ministerit = useQuery({
        method: "GET",
        endpoint: `/api/ministerit/${apu}`
    })


    if (!ministerit.loading && !ministerit.error) {
        sortatutMinisterit = ministerit.payload.sort( (a, b) =>  {
            if (a.Rooli < b.Rooli) {
                return -1
            }
            if (a.Rooli > b.Rooli) {
                return 1
            }
            else return 0
        })
    }
    //console.log("ministerit: ", sortatutMinisterit)
    // console.log("ministerit: ", ministerit.payload)

    //jos valitulle vuodelle osuu useampi hallituskausi
    const vaihdaHallitusta = () => {
        if (counter < data.length-1)
            setCounter(counter + 1)
        else 
            setCounter(0)
    }


    if (data.length === 1){

        return (
            <>
                {
                    data.map((hallitus, i) => {
                        return (<div key={"hallitus" + i}>
                            <div className="hallitustiedot">
                                <div><strong>Hallitus: {hallitus.Hallitus}</strong></div>
                                <div>Alku: {hallitus.Alku}</div>
                                <div>Loppu: {hallitus.Loppu}</div>
                                <div>Hallituspäivät: {hallitus["Hallituspäivät"]}</div>
                                <div>Pääministerin puolue: {hallitus["Pääministerin puolue"]}</div>
                                <img className="paaministerikuva" src={paaministerit[apu-2]} alt="vanhanen vain nauroi" />
                            </div>
                        </div>)
                    }
                    )
                }
                <div className="ministeri">
                    {sortatutMinisterit.map(nimi => <details  key={nimi._id}><summary>{nimi.Rooli}: {nimi.Ministeri}</summary>
                        <p>Nimitetty: {nimi.Nimitetty}</p>
                        <p>Puolue: {nimi.Puolue}</p>
                    </details>)}
                </div>

                
            </>
        )}

    if (data.length > 1) {
        if (data[0] === "undefined") {
            return  ""
        }
           
        else {
            //pakko kikkailla että saadaan yhdelle kaudelle useampi hallitus  
            const hallitusvaluet = Object.values(data[counter]).map(element => element)
            const hallitusavaimet = Object.keys(data[counter]).map(element => element)
            
           
            return(
                <>
                    <div className="hallitustiedot">
                        <button onClick={()=> vaihdaHallitusta()}>Vaihda hallitusta</button>
                        <div><strong>{hallitusavaimet[1]}: {hallitusvaluet[1]}</strong></div>
                        <div>{hallitusavaimet[2]}: {hallitusvaluet[2]}</div>
                        <div>{hallitusavaimet[3]}: {hallitusvaluet[3]}</div>
                        <div>{hallitusavaimet[4]}: {hallitusvaluet[4]}</div>
                        <div>{hallitusavaimet[5]}: {hallitusvaluet[5]}</div>
                        <img className="paaministerikuva" src={paaministerit[apu-2]} alt="vanhanen vain nauroi"/>
                    </div>
                    <div className="ministeri">
                        {sortatutMinisterit.map(nimi => <details  key={nimi._id}><summary>{nimi.Rooli}: {nimi.Ministeri}</summary>
                            <p>Nimitetty: {nimi.Nimitetty}</p>
                            <p>Puolue: {nimi.Puolue}</p>
                        </details>)}
                    </div>
                </>
            )}
    }

    else return <div>terve</div>
}
export default Hallituskaudet