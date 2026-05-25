import { Table } from "antd";

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
});

function formatCurrency(value) {
    return currencyFormatter.format(value ?? 0);
}

function formatPercent(value) {
    return `${(value ?? 0).toLocaleString(undefined, {
        maximumFractionDigits: 2,
    })}%`;
}

function CoinsTable({ dataSource, loading, pagination, onChange }) {
    const columns = [
        {
            title: "#",
            dataIndex: "market_cap_rank",
            key: "rank",
            width: 72,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (name, coin) => (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <img src={coin.image} alt="" width={24} height={24} />
                    <span>{name}</span>
                </div>
            ),
        },
        {
            title: "Price",
            dataIndex: "current_price",
            key: "price",
            sorter: (a, b) => a.current_price - b.current_price,
            render: formatCurrency,
        },
        {
            title: "24h %",
            dataIndex: "price_change_percentage_24h",
            key: "change24h",
            sorter: (a, b) =>
                a.price_change_percentage_24h - b.price_change_percentage_24h,
            render: (value) => (
                <span style={{ color: value >= 0 ? "#16794c" : "#cf1322" }}>
                    {formatPercent(value)}
                </span>
            ),
        },
        {
            title: "Market Cap",
            dataIndex: "market_cap",
            key: "marketCap",
            sorter: (a, b) => a.market_cap - b.market_cap,
            render: formatCurrency,
        },
        {
            title: "24h Volume",
            dataIndex: "total_volume",
            key: "volume24h",
            sorter: (a, b) => a.total_volume - b.total_volume,
            render: formatCurrency,
        },
    ];

    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            pagination={pagination}
            onChange={onChange}
            scroll={{ y: 600 }}
        />
    );
}

export default CoinsTable;
