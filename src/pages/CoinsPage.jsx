import { Alert, Spin } from "antd";
import CoinsTable from "../components/CoinsTable.jsx";
import { useCoins } from "../hooks/useCoins.js";

function CoinsPage() {
    const { data, error, isLoading } = useCoins();

    if (isLoading) {
        return <Spin />;
    }

    if (error) {
        return (
            <Alert
                type="error"
                message={error.message || "Unable to load coins."}
                showIcon
            />
        );
    }

    return <CoinsTable dataSource={data ?? []} loading={isLoading} />;
}

export default CoinsPage;
