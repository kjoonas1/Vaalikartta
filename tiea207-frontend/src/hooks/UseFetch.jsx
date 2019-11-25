import { useState, useEffect } from "react"
import axios from "axios"

// Toteuttaa get-pyynnöt.
// Käyttö esim. const res = useFetch("http://localhost:8000/api/helloworld")
// res.data sisältää datan, res.error virheen, res.isLoading tiedon onko lataus suoritettu.
export const useFetch = (url) => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
  
    useEffect(() => {
        let mounted = true
        const abortController = new AbortController()
        const fetchData = async () => {
            try {
                if (!url) throw Error("Invalid url")
                const response = await axios.get(url, {signal: abortController.signal, timeout: 20000 })
                if (mounted) {
                    setData(response.data)
                }
            } catch (err) {
                setError(err)
            }
        }
        fetchData()

        // Hoitaa tilanteen jossa pyyntö katkaistaan.
        const cleanup = () => {
            mounted = false
            abortController.abort()
        }
        return cleanup
    }, [url]) 
    return { data, error }
}