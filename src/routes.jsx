import { DollarOutlined, HomeOutlined } from "@ant-design/icons";
import Home from "./pages/Home.jsx";
import CoinsPage from "./pages/CoinsPage.jsx";

export const routes = [
    { path: "/", label: "Home", icon: <HomeOutlined />, element: <Home /> },
    {
        path: "/coins",
        label: "Coins",
        icon: <DollarOutlined />,
        element: <CoinsPage />,
    },
];
