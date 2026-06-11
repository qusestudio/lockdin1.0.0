import {api} from "@/src/api/client";
import {authStore} from "@/src/stores/authStore";

export type Room = {
    id: string;
    name: string;
    subject: string;
    grade: number;
    category: string;
    isLive: boolean;
    createdAt: string;
};

export interface RoomsQueryParams {
    search?: string;
    grade?: number;
    subjectCategory?: string;
}


export const fetchRooms =
    async (
        {
            grade,
            subjectCategory,
            search
        }
        : RoomsQueryParams
    ) => {
        const {data} = await api.get("/rooms", {
            params: {
                grade,
                category: subjectCategory,
                search
            },
        });

        return data;
    };

export const fetchRoom = async (id: string): Promise<Room> => {
    const {data} = await api.get(`/rooms/${id}`);
    return data;
}

export type LiveKitTokenResponse = {
    serverUrl: string;
    participantToken: string;
}

export const fetchLiveKitToken = async (roomId: string) => {
    const user = authStore.getState().user;
    if(!user) return;
    const {data} = await api.post(
        `/rooms/${roomId}/token`,
        {
            participantName: user.fullName,
            participantIdentity: user.id,
        },
    );

    return data as LiveKitTokenResponse;
}


