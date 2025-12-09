import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { i18n, initializeLanguage, changeLanguage, getCurrentLanguage, languages } from '@/lib/i18n';

interface LanguageContextType {
    locale: string;
    setLocale: (lang: string) => Promise<void>;
    t: (key: string, options?: object) => string;
    languages: typeof languages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState(getCurrentLanguage());
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const init = async () => {
            await initializeLanguage();
            setLocaleState(getCurrentLanguage());
            setIsReady(true);
        };
        init();
    }, []);

    const setLocale = async (lang: string) => {
        await changeLanguage(lang);
        setLocaleState(lang);
    };

    const t = (key: string, options?: object) => i18n.t(key, options);

    if (!isReady) {
        return null; // Or a loading spinner
    }

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t, languages }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
