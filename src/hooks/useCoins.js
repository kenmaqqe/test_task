import { useQuery } from "@tanstack/react-query";

const COINS_URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=1";

async function fetchCoins() {
    const response = await fetch(COINS_URL);

    if (!response.ok) {
        throw new Error("Unable to load coins. Please try again later.");
    }

    return response.json();
}

export function useCoins() {
    return useQuery({
        queryKey: ["coins"],
        queryFn: fetchCoins,
        staleTime: 30000,
    });
}
