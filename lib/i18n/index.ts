import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en } from './en';
import { tr } from './tr';

const i18n = new I18n({
    en,
    tr,
});

// Safe get locale with fallback
const getSystemLocale = () => {
    try {
        const locales = Localization.getLocales();
        if (locales && locales.length > 0 && locales[0].languageCode) {
            return locales[0].languageCode;
        }
    } catch (e) {
        console.log('Error getting locale:', e);
    }
    return 'en'; // Default fallback
};

// Set the locale once at the beginning of your app
const systemLang = getSystemLocale();
i18n.locale = ['en', 'tr'].includes(systemLang) ? systemLang : 'en';
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

const LANGUAGE_KEY = '@app_language';

// Get saved language or system language
export const initializeLanguage = async () => {
    try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (savedLanguage) {
            i18n.locale = savedLanguage;
        } else {
            // Use system language
            const systemLang = getSystemLocale();
            i18n.locale = ['en', 'tr'].includes(systemLang) ? systemLang : 'en';
        }
    } catch (error) {
        console.error('Error loading language:', error);
    }
};

// Change language and save preference
export const changeLanguage = async (lang: string) => {
    try {
        i18n.locale = lang;
        await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    } catch (error) {
        console.error('Error saving language:', error);
    }
};

// Get current language
export const getCurrentLanguage = () => i18n.locale;

// Available languages
export const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'tr', name: 'Turkish', native: 'Türkçe' },
];

export { i18n };
export const t = (key: string, options?: object) => i18n.t(key, options);
