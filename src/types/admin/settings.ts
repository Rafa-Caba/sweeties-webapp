export interface AdminSettings {
    // Branding
    siteName: string;
    siteTagline: string;
    logoLightUrl?: string;
    logoDarkUrl?: string;
    faviconUrl?: string;

    // Contact
    contactEmail: string;
    contactPhone: string;
    contactWhatsApp: string;
    contactAddress: string;

    // UI
    defaultThemeMode: 'SYSTEM' | 'LIGHT' | 'DARK';
    publicThemeGroup?: string;
    adminThemeGroup?: string;

    // Nested Objects
    social: {
        facebook?: string;
        instagram?: string;
        tiktok?: string;
        youtube?: string;
        threads?: string;
        x?: string;
    };

    features: {
        enableOrders: boolean;
        enableGallery: boolean;
        enableMaterials: boolean;
        enableContactPage: boolean;
        enableCart: boolean;
    };

    seo: {
        siteDescription?: string;
        metaKeywords: string[];
        ogTitle?: string;
        ogDescription?: string;
        ogImageUrl?: string;
    };

    visibility: {
        showEmail: boolean;
        showPhone: boolean;
        showWhatsApp: boolean;
        showAddress: boolean;
        showSocial: boolean;
    };

    home: {
        heroTitle?: string;
        heroSubtitle?: string;
        creatorName?: string;
    };

    about: {
        bio?: string;
        imageUrl?: string;
    };

    gallery: {
        itemsPerPage: number;
    };

    footer: {
        legalText?: string;
        auxiliaryLinks: { label: string; url: string }[];
    };
}