import { useState, useEffect } from 'react'

interface GeolocationState {
    latitude: number | null
    longitude: number | null
    error: string | null
    isLoading: boolean
}

export function useGeolocation() {
    const [state, setState] = useState<GeolocationState>({
        latitude: null,
        longitude: null,
        error: null,
        isLoading: true,
    })

    useEffect(() => {
        if (!navigator.geolocation) {
            setState(prev => ({
                ...prev,
                error: 'Geolocation is not supported by this browser',
                isLoading: false,
            }))
            return
        }

        const success = (position: GeolocationPosition) => {
            setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
                isLoading: false,
            })
        }

        const error = (err: GeolocationPositionError) => {
            setState(prev => ({
                ...prev,
                error: err.message,
                isLoading: false,
            }))
        }

        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
        })
    }, [])

    const getCurrentPosition = () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }))

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                    isLoading: false,
                })
            },
            (err) => {
                setState(prev => ({
                    ...prev,
                    error: err.message,
                    isLoading: false,
                }))
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        )
    }

    return {
        ...state,
        getCurrentPosition,
    }
}
