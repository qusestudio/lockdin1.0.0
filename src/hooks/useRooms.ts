import { useQuery } from "@tanstack/react-query";
import { fetchRooms, RoomsQueryParams } from "@/src/api/rooms";

export const useRooms = (params: RoomsQueryParams) => {
    return useQuery({
        queryKey: ["rooms", params],
        queryFn: () => fetchRooms(params),
    });
};