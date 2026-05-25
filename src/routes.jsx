import {
    DollarOutlined,
    HomeOutlined,
    LineChartOutlined,
    FormOutlined,
} from "@ant-design/icons";
import Home from "./pages/Home.jsx";
import CoinsPage from "./pages/CoinsPage.jsx";
import CoinsPagedPage from "./pages/CoinsPagedPage.jsx";
import ChartPage from "./pages/ChartPage.jsx";
import WizardPage from "./pages/WizardPage.jsx";

export const routes = [
    { path: "/", label: "Home", icon: <HomeOutlined />, element: <Home /> },
    {
        path: "/coins",
        label: "Coins",
        icon: <DollarOutlined />,
        element: <CoinsPage />,
    },
    {
        path: "/coins-paged",
        label: "Coins Paged",
        icon: <DollarOutlined />,
        element: <CoinsPagedPage />,
    },
    {
        path: "/chart",
        label: "Chart",
        icon: <LineChartOutlined />,
        element: <ChartPage />,
    },
    {
        path: "/wizard",
        label: "Wizard",
        icon: <FormOutlined />,
        element: <WizardPage />,
    },
];
