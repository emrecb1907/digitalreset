import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import {
    RotateCcw,
    HelpCircle,
    Mail,
    Shield,
    Star,
    ChevronRight,
    X,
    Globe,
    Check
} from 'lucide-react-native';
import * as React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Linking, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useLanguage } from '@/context/LanguageContext';

export default function SettingsScreen() {
    const { t, locale, setLocale, languages } = useLanguage();
    const [showLanguageModal, setShowLanguageModal] = React.useState(false);

    const SETTINGS_ITEMS = [
        {
            Icon: Globe,
            label: t('settings.language'),
            desc: t('settings.languageDesc'),
            value: languages.find(l => l.code === locale)?.native,
            onPress: () => setShowLanguageModal(true),
            showValue: true,
        },
        {
            Icon: RotateCcw,
            label: t('settings.restore'),
            desc: t('settings.restoreDesc'),
            onPress: () => { /* Restore */ },
        },
        {
            Icon: HelpCircle,
            label: t('settings.howItWorks'),
            desc: t('settings.howItWorksDesc'),
            onPress: () => { /* Tutorial */ },
        },
        {
            Icon: Mail,
            label: t('settings.contact'),
            desc: t('settings.contactDesc'),
            onPress: () => Linking.openURL('mailto:support@digitalreset.app'),
        },
        {
            Icon: Shield,
            label: t('settings.privacy'),
            desc: t('settings.privacyDesc'),
            onPress: () => { /* Privacy */ },
        },
        {
            Icon: Star,
            label: t('settings.rate'),
            desc: t('settings.rateDesc'),
            onPress: () => { /* Rate */ },
        },
    ];

    const handleLanguageSelect = async (langCode: string) => {
        await setLocale(langCode);
        setShowLanguageModal(false);
    };

    return (
        <>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <LinearGradient
                    colors={['#FFFFFF', '#FAFBFF', '#F5F3FF']}
                    style={StyleSheet.absoluteFill}
                />

                {/* Header */}
                <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.closeButton}>
                        <X size={24} color="#6B7280" strokeWidth={1.5} />
                    </Pressable>
                    <Text style={styles.title}>{t('settings.title')}</Text>
                    <View style={{ width: 40 }} />
                </Animated.View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Settings List */}
                    <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.settingsCard}>
                        {SETTINGS_ITEMS.map((item, index) => {
                            const IconComponent = item.Icon;
                            const isLast = index === SETTINGS_ITEMS.length - 1;

                            return (
                                <Pressable
                                    key={index}
                                    onPress={item.onPress}
                                    style={[styles.settingsRow, !isLast && styles.settingsRowBorder]}
                                >
                                    <View style={styles.settingsIcon}>
                                        <IconComponent size={20} color="#8B5CF6" strokeWidth={1.5} />
                                    </View>
                                    <View style={styles.settingsContent}>
                                        <Text style={styles.settingsLabel}>{item.label}</Text>
                                        <Text style={styles.settingsDesc}>{item.desc}</Text>
                                    </View>
                                    {item.showValue ? (
                                        <View style={styles.valueContainer}>
                                            <Text style={styles.valueText}>{item.value}</Text>
                                            <ChevronRight size={18} color="#D1D5DB" strokeWidth={1.5} />
                                        </View>
                                    ) : (
                                        <ChevronRight size={20} color="#D1D5DB" strokeWidth={1.5} />
                                    )}
                                </Pressable>
                            );
                        })}
                    </Animated.View>

                    {/* App Info */}
                    <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.appInfo}>
                        <View style={styles.appLogo}>
                            <Text style={styles.appLogoText}>✨</Text>
                        </View>
                        <Text style={styles.appName}>Digital Reset</Text>
                        <Text style={styles.appVersion}>{t('settings.version')} 1.0.0</Text>
                        <Text style={styles.appTagline}>{t('settings.madeWith')}</Text>
                    </Animated.View>
                </ScrollView>

                {/* Language Modal */}
                <Modal
                    visible={showLanguageModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowLanguageModal(false)}
                >
                    <Pressable
                        style={styles.modalOverlay}
                        onPress={() => setShowLanguageModal(false)}
                    >
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{t('settings.language')}</Text>
                            {languages.map((lang) => (
                                <Pressable
                                    key={lang.code}
                                    onPress={() => handleLanguageSelect(lang.code)}
                                    style={styles.languageRow}
                                >
                                    <View>
                                        <Text style={styles.languageName}>{lang.native}</Text>
                                        <Text style={styles.languageNative}>{lang.name}</Text>
                                    </View>
                                    {locale === lang.code && (
                                        <Check size={22} color="#8B5CF6" strokeWidth={2} />
                                    )}
                                </Pressable>
                            ))}
                        </View>
                    </Pressable>
                </Modal>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 56,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    settingsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 4,
        marginBottom: 32,
    },
    settingsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
    },
    settingsRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    settingsIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#FAF5FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    settingsContent: {
        flex: 1,
    },
    settingsLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 2,
    },
    settingsDesc: {
        fontSize: 13,
        color: '#9CA3AF',
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    valueText: {
        fontSize: 14,
        color: '#8B5CF6',
        fontWeight: '500',
    },
    appInfo: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    appLogo: {
        width: 64,
        height: 64,
        borderRadius: 18,
        backgroundColor: '#FAF5FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    appLogoText: {
        fontSize: 28,
    },
    appName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 4,
    },
    appVersion: {
        fontSize: 14,
        color: '#9CA3AF',
        marginBottom: 8,
    },
    appTagline: {
        fontSize: 14,
        color: '#A78BFA',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 320,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 20,
        textAlign: 'center',
    },
    languageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    languageName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    languageNative: {
        fontSize: 13,
        color: '#9CA3AF',
        marginTop: 2,
    },
});
