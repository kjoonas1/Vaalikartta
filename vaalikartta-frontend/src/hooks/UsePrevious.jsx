import { useEffect, useRef } from "react"

// voidaan käyttää näin: const prevData = usePrevious(data);
export const usePrevious = value => {
    const ref = useRef()

    // Sijoita nykyinen arvo refiin
    useEffect(() => {
        ref.current = value
    }, [value]) // Päivitetään arvo vain arvon muuttuessa

    // Palautetaan edellinen arvo
    return ref.current
}
