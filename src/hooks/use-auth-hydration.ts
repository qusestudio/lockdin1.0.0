import {useEffect, useState} from "react";

import {useAuthStore} from "@/src/stores/authStore";

export function useAuthHydration() {
    const [hasHydrated, setHasHydrated] = useState(() => useAuthStore.persist.hasHydrated());

    useEffect(() => {
        const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
            setHasHydrated(true);
        });

        setHasHydrated(useAuthStore.persist.hasHydrated());

        return unsubscribe;
    }, []);

    return hasHydrated;
}
