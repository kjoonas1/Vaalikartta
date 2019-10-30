import { useState, useEffect } from "react"
import axios from "axios"

// Toteuttaa get-pyynnöt.
// Käyttö esim. const res = useFetch("http://localhost:8000/api/helloworld")
// res.data sisältää datan, res.error virheen, res.isLoading tiedon onko lataus suoritettu.
const useFetch = (url) => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
  
    useEffect(() => {
        let mounted = true
        const abortController = new AbortController()
        const fetchData = async () => {
            setIsLoading(true)
            try {
                if (!url) throw Error("Invalid url")
                const response = await axios.get(url, {signal: abortController.signal, timeout: 20000 })
                if (mounted) {
                    setData(response.data)
                    setIsLoading(false)
                }
            } catch (err) {
                setIsLoading(false)
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
    return { data, error, isLoading }
}
export { useFetch }