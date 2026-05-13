import {
    View, Text, TouchableOpacity, StyleSheet,
    Dimensions, FlatList, Animated, NativeSyntheticEvent,
    NativeScrollEvent
} from 'react-native'
import {useEffect, useRef, useState} from 'react'
import {useRouter} from 'expo-router'
import {SafeAreaView} from "react-native-safe-area-context";
import {Image} from "expo-image";

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wordmark: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 8,
        fontFamily: "DT Getai Grotesk Display Black",
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePlaceholder: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    placeholderText: {
        color: '#9E9E9E',
        fontFamily: 'Geist',
        fontSize: 14,
    },
    slideText: {
        fontSize: 30,
        textAlign: 'center',
        color: '#000',
        fontFamily: "DT Getai Grotesk Display Black",
        lineHeight: 28,
        paddingVertical: 8,
    },
    dots: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    buttons: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        gap: 12,
    },
    primaryBtn: {
        backgroundColor: '#00FF11',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        alignItems: 'center',
    },
    primaryText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'Geist Medium',
    },
    secondaryBtn: {
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
    },
    secondaryText: {
        color: '#000',
        fontSize: 16,
        paddingHorizontal: 20,
        textDecorationLine: 'underline',
        fontFamily: 'Geist Medium',
    },
})

const SLIDES = [
    {
        id: '1',
        image: require('../assets/images/Carousel-1.svg'),
        color: "#D089FF",
        text: (
            <Text style={styles.slideText}>
                Studying is easier{'\n'}when someone&#39;s{'\n'}
                <Text style={{color: "#D089FF"}}>
                    watching
                </Text>.
            </Text>
        ),
    },
    {
        id: '2',
        image: require('../assets/images/Carousel-2.svg'),
        color: "#11A11B",
        text: (
            <Text style={styles.slideText}>
                Your grade.{'\n'}Your subjects.{'\n'}Your people.
                <Text style={{color: "#11A11B"}}>
                    {" "}Live
                </Text>.
            </Text>
        ),
    },
    {
        id: '3',
        image: require('../assets/images/Carousel-3.svg'),
        color: "#D5C124",
        text: (
            <Text style={styles.slideText}>
                No chats.{"\n"}No drama.{"\n"}Just
                <Text style={{color: "#D5C124"}}>
                    {" "}focus
                </Text>.
            </Text>
        ),
    },
    {
        id: '4',
        image: require('../assets/images/Carousel-4.svg'),
        color: "#2C7DB7",
        text: (
            <Text style={styles.slideText}>
                Every room is a reason to open {"\n"} your
                <Text style={{color: "#2C7DB7"}}>
                    {" "}books
                </Text>.
            </Text>
        ),
    },
    {
        id: '5',
        image: require('../assets/images/Carousel-5.svg'),
        color: "#F22424",
        text: (
            <Text style={styles.slideText}>
                The grind is less lonely when you&#39;re not
                <Text style={{color: "#F22424"}}>
                    {" "}alone
                </Text>.
            </Text>
        ),
    },
]

export default function HomeScreen() {
    const router = useRouter()
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current

    const flatListRef = useRef<FlatList>(null)


    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % SLIDES.length
            flatListRef.current?.scrollToIndex({index: nextIndex, animated: true})
            setActiveIndex(nextIndex)
        }, 3000)

        return () => clearInterval(interval)
    }, [activeIndex])

    const onScroll = Animated.event(
        [{nativeEvent: {contentOffset: {x: scrollX}}}],
        {useNativeDriver: false}
    )

    const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width)
        setActiveIndex(index)
    }

    return (
        <SafeAreaView style={styles.container}>

            {/* Wordmark */}
            <View style={{flexDirection: 'column', display: 'flex', flex: 1 , justifyContent: 'flex-end', padding: 2, }}>
                <View style={{flexDirection: 'row', display: 'flex', alignItems: 'flex-end', padding: 2, }}>
                    <Text style={{fontFamily: "DT Getai Grotesk Display Black", fontSize: 25}}>
                        Lockdin
                    </Text>
                    <Text style={{fontSize: 18, alignSelf: 'flex-start', marginTop: -2, fontFamily: "DT Getai Grotesk Display Black"}}>®</Text>
                </View>
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
                renderItem={({item}) => (
                    <View style={styles.slide}>
                        {/* Image placeholder — replace null with require() path */}
                        <Image
                            source={item.image}
                            style={styles.imagePlaceholder}
                        />
                        {item.text}
                        <Text style={{paddingTop: 8, fontFamily: "Geist Medium", opacity: 0.5}}>
                            Show up. Open your books. Stay accountable.
                        </Text>
                    </View>
                )}
            />
            {/* Dots */}
            <View style={styles.dots}>
                {SLIDES.map(({color}, i) => {
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

                    const isActive = activeIndex === i;

                    return (
                        <Animated.View
                            key={i}
                            style={[styles.dot, {opacity, width: dotWidth, backgroundColor: isActive ? color : "#D9D9D9"}]}
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
                    <Text style={{fontFamily: "Geist"}}>Already have an account?</Text>
                    <Text style={styles.secondaryText}>Login</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

