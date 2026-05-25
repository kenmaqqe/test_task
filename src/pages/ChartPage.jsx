import { useMemo, useRef, useState } from "react";
import { Alert, Button, Segmented, Space, Spin, Typography } from "antd";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useMarketChart } from "../hooks/useMarketChart.js";

const coinOptions = [
    { label: "Bitcoin", value: "bitcoin" },
    { label: "Ethereum", value: "ethereum" },
    { label: "Dogecoin", value: "dogecoin" },
];

function formatLargeNumber(value) {
    return Number(value ?? 0).toLocaleString(undefined, {
        notation: "compact",
        maximumFractionDigits: 2,
    });
}

function ChartPage() {
    const [selectedCoin, setSelectedCoin] = useState("bitcoin");
    const isManualRefetching = useRef(false);
    const { data, error, isLoading, isFetching, refetch } =
        useMarketChart(selectedCoin);
    const [, forceRender] = useState(0);
    const showLoader = isLoading || isManualRefetching.current;
    const chartData = useMemo(
        () =>
            (data?.prices ?? []).map(([timestamp, price]) => ({
                date: new Date(timestamp).toLocaleDateString(),
                price,
            })),
        [data],
    );
    const isBackgroundRefreshing =
        isFetching && !isLoading && !isManualRefetching.current;

    async function handleRefresh() {
        isManualRefetching.current = true;
        forceRender((value) => value + 1);

        try {
            await refetch();
        } finally {
            isManualRefetching.current = false;
            forceRender((value) => value + 1);
        }
    }

    return (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Segmented
                options={coinOptions}
                value={selectedCoin}
                onChange={setSelectedCoin}
            />

            {error ? (
                <Alert
                    type="error"
                    message={error.message || "Unable to load market chart."}
                    showIcon
                />
            ) : showLoader ? (
                <Spin />
            ) : (
                <>
                    <Space>
                        <Button type="primary" onClick={handleRefresh}>
                            Refresh
                        </Button>
                        {isBackgroundRefreshing ? (
                            <Typography.Text type="secondary">
                                Updating in background
                            </Typography.Text>
                        ) : null}
                    </Space>
                    <ResponsiveContainer width="100%" height={360}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis
                                domain={["auto", "auto"]}
                                tickFormatter={formatLargeNumber}
                            />
                            <Tooltip
                                formatter={(value) => [
                                    `$${Number(value).toLocaleString()}`,
                                    "Price",
                                ]}
                            />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#1677ff"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </>
            )}
        </Space>
    );
}

export default ChartPage;
