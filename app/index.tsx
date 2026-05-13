import {
    View, Text, TouchableOpacity, StyleSheet,
    Dimensions, FlatList, Animated, NativeSyntheticEvent,
    NativeScrollEvent
} from 'react-native'
import {useEffect, useRef, useState} from 'react'
import { useRouter } from 'expo-router'
import {SafeAreaView} from "react-native-safe-area-context";

const { width } = Dimensions.get('window')

const SLIDES = [
    {
        id: '1',
        image: null, // replace with require('../assets/images/slide1.png')
        text: 'Studying is easier when someone\'s watching.',
    },
    {
        id: '2',
        image: null, // replace with require('../assets/images/slide2.png')
        text: 'Your grade. Your subjects. Your people. Live.',
    },
    {
        id: '3',
        image: null, // replace with require('../assets/images/slide3.png')
        text: 'No chats. No drama. Just focus.',
    },
    {
        id: '4',
        image: null, // replace with require('../assets/images/slide4.png')
        text: 'Every room is a reason to open your books.',
    },
    {
        id: '5',
        image: null, // replace with require('../assets/images/slide5.png')
        text: 'The grind is less lonely when you\'re not the only one.',
    },
]

export default function   HomeScreen() {
    const router = useRouter()
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current

    const flatListRef = useRef<FlatList>(null)


    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % SLIDES.length
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true })
            setActiveIndex(nextIndex)
        }, 3000)

        return () => clearInterval(interval)
    }, [activeIndex])

    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    )

    const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width)
        setActiveIndex(index)
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* Wordmark */}
            <View style={styles.wordmark}>
                <Text style={styles.logo}>Lockdin</Text>
                <Text style={styles.logoSup}>®</Text>
            </View>

            {/* Carousel */}
            <Animated.FlatList
                ref={flatListRef}
                getItemLayout={(_, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
                data={SLIDES}
                keyExtractor={item => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                onMomentumScrollEnd={onMomentumScrollEnd}
                scrollEventThrottle={16}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        {/* Image placeholder — replace null with require() path */}
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.placeholderText}>Image goes here</Text>
                        </View>
                        <Text style={styles.slideText}>{item.text}</Text>
                    </View>
                )}
            />

            {/* Dots */}
            <View style={styles.dots}>
                {SLIDES.map((_, i) => {
                    const opacity = scrollX.interpolate({
                        inputRange: [(i - 1) * width, i * width, (i + 1) * width],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    })
                    const dotWidth = scrollX.interpolate({
                        inputRange: [(i - 1) * width, i * width, (i + 1) * width],
                        outputRange: [8, 20, 8],
                        extrapolate: 'clamp',
                    })
                    return (
                        <Animated.View
                            key={i}
                            style={[styles.dot, { opacity, width: dotWidth }]}
                        />
                    )
                })}
            </View>

            {/* Buttons */}
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => router.push('/signup')}
                >
                    <Text style={styles.primaryText}>Get Started</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => router.push('/login')}
                >
                    <Text style={styles.secondaryText}>Log In</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    wordmark: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 8,
    },
    logo: {
        fontSize: 32,
        fontFamily: 'DT Getai Display Black',
        color: '#000',
    },
    logoSup: {
        fontSize: 12,
        color: '#000',
        marginTop: 6,
    },
    slide: {
        width,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePlaceholder: {
        width: width - 48,
        height: 320,
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    placeholderText: {
        color: '#9E9E9E',
        fontFamily: 'Geist',
        fontSize: 14,
    },
    slideText: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: '#000',
        fontFamily: 'DT Getai Display Black',
        lineHeight: 28,
        paddingHorizontal: 8,
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        marginTop: 20,
        marginBottom: 12,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#39FF14',
    },
    buttons: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        gap: 12,
    },
    primaryBtn: {
        backgroundColor: '#000',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
    },
    primaryText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Geist',
    },
    secondaryBtn: {
        backgroundColor: '#F2F2F2',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
    },
    secondaryText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Geist',
    },
})