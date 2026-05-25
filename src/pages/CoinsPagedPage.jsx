import { Alert, Pagination, Space } from "antd";
import { useSearchParams } from "react-router-dom";
import CoinsTable from "../components/CoinsTable.jsx";
import { useCoinsPaged } from "../hooks/useCoinsPaged.js";

function getPage(value) {
    const page = Number(value);
    return Number.isInteger(page) && page > 0 ? page : 1;
}

function CoinsPagedPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = getPage(searchParams.get("page"));
    const { data, error, isFetching } = useCoinsPaged(page);

    function handlePageChange(newPage) {
        setSearchParams({ page: newPage });
    }

    if (error) {
        return (
            <Alert
                type="error"
                message={error.message || "Unable to load paged coins."}
                showIcon
            />
        );
    }

    return (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <CoinsTable
                dataSource={data ?? []}
                loading={isFetching}
                pagination={false}
            />
            <Pagination
                current={page}
                pageSize={20}
                total={400}
                onChange={handlePageChange}
            />
        </Space>
    );
}

export default CoinsPagedPage;
