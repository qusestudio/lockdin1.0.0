import { useEffect, useState } from 'react'
import { View } from 'react-native'

export default function PulseDot() {
    const [pulse, setPulse] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setPulse(p => !p)
        }, 900)
        return () => clearInterval(interval)
    }, [])

    return (
        <View style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#39FF14',
            opacity: pulse ? 1 : 0.3,
            animationName: "pulse",
        }} />
    )
}