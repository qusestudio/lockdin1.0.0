import {api} from "@/src/api/client";

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