import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import { Check, Lock, Sparkles } from 'lucide-react-native';
import * as React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useLanguage } from '@/context/LanguageContext';

const PREVIEW_DAYS = [
    { day: 1, task: 'Delete 50 old screenshots', unlocked: true },
    { day: 2, task: 'Unsubscribe from 5 newsletters', unlocked: false },
    { day: 3, task: 'Remove 3 unused apps', unlocked: false },
    { day: 4, task: 'Unfollow 10 inactive accounts', unlocked: false },
];

export default function PreviewScreen() {
    const { t } = useLanguage();

    return (
        <>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <LinearGradient
                    colors={['#FFFFFF', '#FAFBFF', '#F5F3FF']}
                    style={StyleSheet.absoluteFill}
                />

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Success Icon */}
                    <Animated.View entering={FadeIn.duration(600)} style={styles.successIcon}>
                        <LinearGradient
                            colors={['#7C3AED', '#8B5CF6']}
                            style={styles.successGradient}
                        >
                            <Check size={32} color="#FFFFFF" strokeWidth={2} />
                        </LinearGradient>
                    </Animated.View>

                    {/* Header */}
                    <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.header}>
                        <Text style={styles.title}>{t('onboarding.preview.title')}</Text>
                        <Text style={styles.subtitle}>{t('onboarding.preview.subtitle')}</Text>
                    </Animated.View>

                    {/* Day 1 Card */}
                    <Animated.View entering={FadeInDown.delay(300).duration(500)}>
                        <LinearGradient
                            colors={['#7C3AED', '#6D28D9']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.day1Card}
                        >
                            <View style={styles.freeBadge}>
                                <Text style={styles.freeBadgeText}>{t('onboarding.preview.free')}</Text>
                            </View>
                            <Text style={styles.day1Label}>{t('onboarding.preview.day')} 1</Text>
                            <Text style={styles.day1Task}>Delete 50 old screenshots</Text>
                            <Text style={styles.day1Desc}>Start with a quick gallery cleanup</Text>
                        </LinearGradient>
                    </Animated.View>

                    {/* Preview List */}
                    <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.previewSection}>
                        <Text style={styles.previewTitle}>{t('onboarding.preview.comingNext')}</Text>
                        {PREVIEW_DAYS.slice(1).map((item, index) => (
                            <View key={item.day} style={styles.previewRow}>
                                <View style={styles.previewDayBadge}>
                                    <Lock size={12} color="#9CA3AF" strokeWidth={2} />
                                </View>
                                <View style={styles.previewContent}>
                                    <Text style={styles.previewDay}>{t('timeline.day')} {item.day}</Text>
                                    <Text style={styles.previewTask}>{item.task}</Text>
                                </View>
                            </View>
                        ))}
                    </Animated.View>

                    {/* Unlock Banner */}
                    <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.unlockBanner}>
                        <Sparkles size={20} color="#7C3AED" strokeWidth={1.5} />
                        <View style={styles.unlockContent}>
                            <Text style={styles.unlockTitle}>{t('onboarding.preview.unlockAll')}</Text>
                            <Text style={styles.unlockDesc}>{t('onboarding.preview.oneTime')}</Text>
                        </View>
                        <Text style={styles.unlockPrice}>$6.99</Text>
                    </Animated.View>
                </ScrollView>

                {/* Footer */}
                <Animated.View entering={FadeInDown.delay(600).duration(500)} style={styles.footer}>
                    <Pressable onPress={() => router.replace('/(tabs)')} style={styles.primaryButton}>
                        <LinearGradient
                            colors={['#7C3AED', '#6D28D9']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.buttonGradient}
                        >
                            <Text style={styles.primaryButtonText}>{t('onboarding.preview.startFree')}</Text>
                        </LinearGradient>
                    </Pressable>

                    <Pressable onPress={() => router.push('/paywall')} style={styles.secondaryButton}>
                        <Text style={styles.secondaryButtonText}>{t('onboarding.preview.unlockFull')}</Text>
                    </Pressable>
                </Animated.View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 80,
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    successIcon: {
        alignSelf: 'center',
        marginBottom: 24,
    },
    successGradient: {
        width: 72,
        height: 72,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 10,
    },
    header: {
        alignItems: 'center',
        marginBottom: 28,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
    },
    day1Card: {
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 20,
        elevation: 12,
    },
    freeBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 16,
    },
    freeBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    day1Label: {
        fontSize: 13,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 6,
    },
    day1Task: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    day1Desc: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.8)',
    },
    previewSection: {
        marginBottom: 20,
    },
    previewTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: 12,
    },
    previewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 14,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    previewDayBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    previewContent: {
        flex: 1,
    },
    previewDay: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9CA3AF',
    },
    previewTask: {
        fontSize: 15,
        color: '#6B7280',
    },
    unlockBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAF5FF',
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: '#EDE9FE',
    },
    unlockContent: {
        flex: 1,
        marginLeft: 14,
    },
    unlockTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#7C3AED',
    },
    unlockDesc: {
        fontSize: 13,
        color: '#A78BFA',
    },
    unlockPrice: {
        fontSize: 20,
        fontWeight: '700',
        color: '#7C3AED',
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        gap: 12,
    },
    primaryButton: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 10,
    },
    buttonGradient: {
        paddingVertical: 18,
        alignItems: 'center',
    },
    primaryButtonText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    secondaryButton: {
        paddingVertical: 14,
        alignItems: 'center',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#8B5CF6',
    },
});
