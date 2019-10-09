import { useState, useLayoutEffect } from "react"
import axios from "axios"

// Toteuttaa get-pyynnöt.
// Käyttö esim. const res = useFetch("http://localhost:8000/api/helloworld")
// res.data sisältää datan, res.error virheen, res.isLoading tiedon onko lataus suoritettu.
function useFetch(url) {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
  
    useLayoutEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(url)
                setData(response.data)
                setIsLoading(false)
            } catch (err) {
                setError(err)
            }
        }
        fetchData()
    }, [url])
    return { data: [data], error, isLoading }
}
export { useFetch }
