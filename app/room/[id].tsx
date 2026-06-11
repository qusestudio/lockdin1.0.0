import {useLocalSearchParams} from "expo-router";
import * as React from "react";
import {
    Dimensions,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    ActivityIndicator,
    ViewStyle
} from "react-native";
import {useEffect} from "react";
import {
    AudioSession,
    LiveKitRoom,
    useTracks,
    VideoTrack,
    isTrackReference,
    registerGlobals,
    useLocalParticipant,  useConnectionState
} from "@livekit/react-native";

import {RoomsSkeleton} from "@/app/(tabs)";
import {useLivekitConnection} from "@/src/hooks/useRooms";
import {HugeiconsIcon} from "@hugeicons/react-native";
import {
    Video02Icon,
    VideoOffIcon
} from "@hugeicons/core-free-icons";
import {ConnectionState, Track} from "livekit-client";

registerGlobals();

export default function RoomScreen() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const {data, isLoading} = useLivekitConnection(id);

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
                <RoomsSkeleton/>
            ) : (
                <LiveKitRoom
                    serverUrl={data?.serverUrl}
                    token={data?.participantToken}
                    connect

                    options={{
                        adaptiveStream: {pixelDensity: "screen"},
                    }}
                    audio
                    video
                >
                    <RoomView/>
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
    const tracks = useTracks(
        [{source: Track.Source.Camera, withPlaceholder: false}],
        {onlySubscribed: false}
    );

    const {localParticipant} = useLocalParticipant();
    const connectionState = useConnectionState();

    const isConnecting = connectionState === ConnectionState.Connecting || connectionState === ConnectionState.Reconnecting;
    const isLocalCameraEnabled = localParticipant?.isCameraEnabled ?? false;


    const handleCameraToggle = async () => {
        if (!localParticipant) return;
        try {
            const cameraTrack = localParticipant.getTrackPublication(Track.Source.Camera);
            if (cameraTrack) {
                if (isLocalCameraEnabled) {
                    await cameraTrack.videoTrack?.mute();
                } else {
                    await cameraTrack.videoTrack?.unmute();
                }
            } else {
                await localParticipant.setCameraEnabled(!isLocalCameraEnabled);
            }
        } catch (error) {
            console.error("Failed to toggle camera state:", error);
        }
    };

    const participantCount = tracks.length;

    const getCellStyles = (): ViewStyle => {
        if (participantCount <= 1) {
            return { width: '100%', height: '100%' };
        } else if (participantCount === 2) {
            return { width: '100%', height: '50%' };
        } else {
            return { width: '50%', height: '50%' }; // 4-person grid view
        }
    };

    if (isConnecting) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#38bdf8"/>
                <Text style={styles.loadingText}>Locking in...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/*TODO: Participant Count*/}
            <View style={styles.gridContainer}>
                {tracks.map((item, index) => {
                    // Check if this specific track belongs to you (the local participant)
                    const isLocalTrack = item.participant.sid === localParticipant?.sid;

                    // Determine if this specific participant has their camera turned on
                    const isTrackVideoEnabled = isLocalTrack ? isLocalCameraEnabled : item.participant.isCameraEnabled;


                    return (
                        <View key={index} style={[styles.cellWrapper, getCellStyles()]}>
                            {isTrackVideoEnabled && isTrackReference(item) ? (
                                <VideoTrack
                                    trackRef={item}
                                    style={StyleSheet.absoluteFillObject}
                                    mirror={isLocalTrack}
                                    objectFit="cover"
                                />
                            ) : (
                                /* Fallback Avatar View per participant cell */
                                <View style={styles.avatarFallbackContainer}>
                                    <View style={styles.initialsCircle}>
                                        <Text style={styles.initialsText}>{getInitials(USER_DATA.name)}</Text>
                                    </View>
                                    <Text style={styles.participantName}>
                                        {USER_DATA.name}
                                    </Text>
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleCameraToggle}
                    activeOpacity={0.8}
                >
                    {
                        !isLocalCameraEnabled ?
                            <HugeiconsIcon icon={VideoOffIcon} color="#000" size={30} />
                        : <HugeiconsIcon icon={Video02Icon} color={"#000"} size={30} />
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
};

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
        backgroundColor: "#fff",
        position: 'relative', // Ensures overlays attach to this bounding box
    },
    gridContainer: {
        flex: 1,
        alignItems: "stretch",
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
    },
    // ✅ Isolates each user into their own layout slot boundary
    cellWrapper: {
        position: 'relative',
        overflow: 'hidden',
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
    avatarFallbackContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        objectFit: "cover",
        height: SCREEN_HEIGHT
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
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "rgba(57, 255, 20, 0.35)",
        // subtle green glow on the circle itself
        shadowColor: "#39FF14",
        shadowOffset: {width: 0, height: 0},
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
        color: "#000",
        marginTop: 16,
        fontSize: 15,
        fontFamily: "Geist",
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
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
