export interface ThemeDefinition {
    id: number;
    name: string;
    isDark: boolean;
    
    // Colors matching your DB columns
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    cardColor: string;
    buttonColor: string;
    navColor: string;
}