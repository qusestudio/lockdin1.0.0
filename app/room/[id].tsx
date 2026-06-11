import { useLocalSearchParams } from "expo-router";
import * as React from "react";
import {Dimensions, Text, StyleSheet, TouchableOpacity, View, ActivityIndicator} from "react-native";
import { useEffect } from "react";
import {
    AudioSession,
    LiveKitRoom,
    useTracks,
    TrackReferenceOrPlaceholder,
    VideoTrack,
    isTrackReference,
    registerGlobals,
    useLocalParticipant, useRoomContext, useConnectionState
} from "@livekit/react-native";
import { Track } from "livekit-client";
import { SafeAreaView } from "react-native-safe-area-context";

import { RoomsSkeleton } from "@/app/(tabs)";
import { useLivekitConnection } from "@/src/hooks/useRooms";
import {HugeiconsIcon} from "@hugeicons/react-native";
import {
    Camera01Icon,
    CameraOff02Icon,
    CameraOffIcon,
    Video01Icon,
    Video02Icon,
    VideoOffIcon
} from "@hugeicons/core-free-icons";
import {Image} from "expo-image";
import { ConnectionState } from "livekit-client";

registerGlobals();

export default function RoomScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data, isLoading } = useLivekitConnection(id);

    useEffect(() => {
        AudioSession.startAudioSession();

        return () => {
            AudioSession.stopAudioSession().then(() => undefined);
        };
    }, []);

    const isInitialLoading = isLoading && !data;

    return (
        <View style={styles.container}>
            {isInitialLoading ? (
                <RoomsSkeleton />
            ) : (
                <LiveKitRoom
                    serverUrl={data?.serverUrl}
                    token={data?.participantToken}
                    connect

                    options={{
                        adaptiveStream: { pixelDensity: "screen" },
                    }}
                    audio
                    video
                >
                    <RoomView />
                </LiveKitRoom>
            )}
        </View>
    );
}

const USER_DATA = {
    name: "Somelele Quse",
    avatarUrl: "", // Put a profile image URL here, or leave empty to fallback to initials
};

// Helper function to get initials from a full name (e.g., "John Doe" -> "JD")
const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

const RoomView = () => {
    const tracks = useTracks([Track.Source.Camera]);

    const {localParticipant} = useLocalParticipant();

    const connectionState = useConnectionState();
    const isConnecting = connectionState === ConnectionState.Connecting || connectionState === ConnectionState.Reconnecting;


    const isCameraEnabled = localParticipant?.isCameraEnabled ?? false;


    const handleCameraToggle = async () => {

        if (!localParticipant) return;
        try {
            const cameraTrack = localParticipant?.getTrackPublication(Track.Source.Camera);
            if (isCameraEnabled) {
                await cameraTrack?.videoTrack?.mute();
            } else {
                await cameraTrack?.videoTrack?.unmute();
            }
        } catch (error) {
            console.error("Failed to toggle camera state:", error);
        }
    };

    if (isConnecting) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#38bdf8" />
                <Text style={styles.loadingText}>Initializing media stream...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {isCameraEnabled && tracks.length > 0 && (
                    tracks.map((item, index) => {
                        if (isTrackReference(item)) {
                            return (
                                <VideoTrack
                                    key={index}
                                    trackRef={item}
                                    style={StyleSheet.absoluteFillObject}
                                    mirror={true}
                                    objectFit="cover"
                                />
                            );
                        }
                        return null;
                    }))}

            {!isCameraEnabled && (

                <View style={[StyleSheet.absoluteFillObject, styles.avatarFallbackContainer]}>
                    {/*<View style={styles.glowOuter} />*/}
                    {/*<View style={styles.glowInner} />*/}
                    {USER_DATA.avatarUrl ? (
                        <Image
                            source={{ uri: USER_DATA.avatarUrl }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <View style={styles.initialsCircle}>
                            <Text style={styles.initialsText}>
                                {getInitials(USER_DATA.name)}
                            </Text>
                        </View>
                    )}
                    <Text style={styles.participantName}>{USER_DATA.name}</Text>
                </View>
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                    ]}
                    onPress={handleCameraToggle}
                >
                    {
                        !isCameraEnabled ? (
                            <HugeiconsIcon icon={VideoOffIcon} size={24} color={"#fff"}/>
                        ) : <HugeiconsIcon icon={Video01Icon} size={24} color={"#fff"} />
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "stretch",
        justifyContent: "center",
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: "#080808",
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        color: "#94a3b8",
        marginTop: 12,
        fontSize: 16,
        fontWeight: "500",
    },
    glowOuter: {
        position: "absolute",
        width: 380,
        height: 380,
        borderRadius: 190,
        backgroundColor: "transparent",
        shadowColor: "#39FF14",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.18,
        shadowRadius: 120,
        elevation: 0,
        // Android fallback — soft green circle
        borderWidth: 1,
        borderColor: "rgba(57, 255, 20, 0.06)",
    },

// Inner glow ring — tighter, slightly more visible
    glowInner: {
        position: "absolute",
        width: 220,
        height: 220,
        borderRadius: 20,
        backgroundColor: "rgba(57, 255, 20, 0.04)",
        shadowColor: "#39FF14",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 60,
        elevation: 0,
    },
    avatarFallbackContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#080808",
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: "rgba(57, 255, 20, 0.4)",
    },
    initialsCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#0f1a0f",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "rgba(57, 255, 20, 0.35)",
        // subtle green glow on the circle itself
        shadowColor: "#39FF14",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 8,
    },
    initialsText: {
        color: "#39FF14",
        fontSize: 40,
        fontWeight: "700",
        fontFamily: "DT Getai Grotesk Display Black",
        letterSpacing: 2,
    },
    participantName: {
        color: "#9ca3af",
        marginTop: 16,
        fontSize: 18,
        fontWeight: "500",
        fontFamily: "Geist Medium",
    },
    participantView: {
        backgroundColor: "#fff",
        borderRadius: 20,
        height: SCREEN_HEIGHT
    },
    buttonContainer: {
        position: "absolute",
        bottom: 50,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    toggleButton: {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.3)",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
