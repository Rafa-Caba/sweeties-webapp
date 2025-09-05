import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        isDark: boolean;
        colors: {
            primary: string;
            accent: string;
            background: string;
            text: string;
            button: string;
            buttonHover: string;
            waveTop: string;
            waveBottom: string;
            mainTitle: string;
            mainSubtitle: string;
            creatorName: string;
            buttonText: string;
            card: string;
            border: string;
            navBg: string,
            sidebarBg: string,
            pageBg: string,
            cardBackground: string,
            cardShadow: string,
            cardHoverShadow: string,
            textSecondary: string,
        },
        shadows: {
            card: string;
        },
        fonts: {
            main: string;
            handwritten: string;
            boldHandwritten: string;
        };
    }
}