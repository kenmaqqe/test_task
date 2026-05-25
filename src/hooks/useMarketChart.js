import { useQuery } from "@tanstack/react-query";

async function fetchMarketChart(coinId) {
    const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`,
    );

    if (!response.ok) {
        throw new Error("Unable to load market chart. Please try again later.");
    }

    return response.json();
}

export function useMarketChart(coinId) {
    return useQuery({
        queryKey: ["chart", coinId],
        queryFn: () => fetchMarketChart(coinId),
        refetchInterval: 30000,
        staleTime: 25000,
    });
}
