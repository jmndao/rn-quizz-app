import dotenv from "dotenv";

dotenv.config();

export default {
    expo: {
        name: "OneSchool",
        slug: "OneSchool",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        runtimeVersion: {
            policy: "sdkVersion",
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/icon.png",
            },
            package: "com.jmndao.OneSchool",
        },
        ios: {
            supportsTablet: true,
        },
        updates: {
            fallbackToCacheTimeout: 0,
            url: "https://u.expo.dev/e2a4cd8d-9e1f-4873-bd5d-c9ec0aec2cb8",
        },

        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#fff",
        },

        assetBundlePatterns: ["**/*"],

        web: {
            favicon: "./assets/favicon.png",
        },
        extra: {
            firebaseApiKey: process.env.FIREBASE_API_KEY,
            firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
            firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
            firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            firebaseAppId: process.env.FIREBASE_APP_ID,
            eas: {
                projectId: "e2a4cd8d-9e1f-4873-bd5d-c9ec0aec2cb8",
            },
        },
    },
};