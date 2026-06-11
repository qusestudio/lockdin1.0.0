import { useQuery } from "@tanstack/react-query";
import {fetchLiveKitToken, fetchRoom, fetchRooms, RoomsQueryParams} from "@/src/api/rooms";

export const useRooms = (params: RoomsQueryParams) => {
    return useQuery({
        queryKey: ["rooms", params],
        queryFn: () => fetchRooms(params),
    });
};

export const useRoom = (id: string) => {
    return useQuery({
        queryKey: ["room", id],
        queryFn: () => fetchRoom(id),
    })
}

export const useLivekitConnection = (roomId: string)=> {
    return useQuery({
        queryKey: ["livekit-token", roomId],
        queryFn: () => fetchLiveKitToken(roomId),
    })
}