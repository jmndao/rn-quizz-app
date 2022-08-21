import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    primary: "#252c4a",
    secondary: "#1E90FF",
    accent: "#0284C7",

    success: "#00C851",
    error: "#ff4444",

    black: "#171717",
    white: "#FFFFFF",
    background: "#252C4A",
};

export const SIZES = {
    base: 10,
    width,
    height,
};

export const menuItems = [{
        id: "48jdu-xd",
        label: "Accueil",
        slug: "home",
        path: "Home",
        icon: "home",
    },
    {
        id: "43ies-ip",
        label: "Score",
        slug: "score",
        path: "Score",
        icon: "flag",
    },
    {
        id: "30iwe-ei",
        label: "Nouveaute",
        slug: "nouveaute",
        path: "Nouveaute",
        icon: "new",
    },
];