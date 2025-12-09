import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import { Circle } from 'lucide-react-native';
import * as React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useLanguage } from '@/context/LanguageContext';

const DURATIONS = [
    { id: '7', days: 7, nameKey: 'onboarding.duration.quickStart', descKey: 'onboarding.duration.quickStartDesc' },
    { id: '14', days: 14, nameKey: 'onboarding.duration.twoWeeks', descKey: 'onboarding.duration.twoWeeksDesc' },
    { id: '21', days: 21, nameKey: 'onboarding.duration.threeWeeks', descKey: 'onboarding.duration.threeWeeksDesc' },
    { id: '30', days: 30, nameKey: 'onboarding.duration.fullMonth', descKey: 'onboarding.duration.fullMonthDesc', recommended: true },
];

export default function DurationScreen() {
    const { t } = useLanguage();
    const [selected, setSelected] = React.useState<string>('30');

    return (
        <>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <LinearGradient
                    colors={['#FFFFFF', '#FAFBFF', '#F5F3FF']}
                    style={StyleSheet.absoluteFill}
                />

                {/* Progress */}
                <Animated.View entering={FadeIn.duration(400)} style={styles.progressBar}>
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: '100%' }]} />
                    </View>
                    <Text style={styles.progressText}>{t('onboarding.step', { current: 3, total: 3 })}</Text>
                </Animated.View>

                {/* Header */}
                <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.header}>
                    <Text style={styles.title}>{t('onboarding.duration.title')}</Text>
                    <Text style={styles.subtitle}>{t('onboarding.duration.subtitle')}</Text>
                </Animated.View>

                {/* Duration Options */}
                <View style={styles.optionsContainer}>
                    {DURATIONS.map((duration, index) => {
                        const isSelected = selected === duration.id;

                        return (
                            <Animated.View
                                key={duration.id}
                                entering={FadeInDown.delay(200 + index * 60).duration(400)}
                            >
                                <Pressable
                                    onPress={() => setSelected(duration.id)}
                                    style={[styles.card, isSelected && styles.cardSelected]}
                                >
                                    {duration.recommended && (
                                        <View style={styles.recommendedBadge}>
                                            <Text style={styles.recommendedText}>{t('onboarding.duration.recommended')}</Text>
                                        </View>
                                    )}
                                    <View style={styles.daysBox}>
                                        <Text style={[styles.daysNumber, isSelected && styles.daysNumberSelected]}>
                                            {duration.days}
                                        </Text>
                                        <Text style={[styles.daysLabel, isSelected && styles.daysLabelSelected]}>{t('onboarding.duration.days')}</Text>
                                    </View>
                                    <View style={styles.cardContent}>
                                        <Text style={[styles.cardName, isSelected && styles.cardNameSelected]}>
                                            {t(duration.nameKey)}
                                        </Text>
                                        <Text style={styles.cardDesc}>{t(duration.descKey)}</Text>
                                    </View>
                                    <View style={[styles.radio, isSelected && styles.radioSelected]}>
                                        {isSelected && <View style={styles.radioInner} />}
                                    </View>
                                </Pressable>
                            </Animated.View>
                        );
                    })}
                </View>

                {/* Footer */}
                <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.footer}>
                    <Pressable
                        onPress={() => router.push('/onboarding/preview')}
                        style={styles.ctaButton}
                    >
                        <LinearGradient
                            colors={['#7C3AED', '#6D28D9']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.ctaGradient}
                        >
                            <Text style={styles.ctaText}>{t('onboarding.duration.createPlan')}</Text>
                        </LinearGradient>
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
    progressBar: {
        paddingTop: 60,
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    progressTrack: {
        height: 4,
        backgroundColor: '#E5E7EB',
        borderRadius: 2,
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#8B5CF6',
        borderRadius: 2,
    },
    progressText: {
        fontSize: 13,
        color: '#9CA3AF',
    },
    header: {
        paddingHorizontal: 24,
        marginBottom: 28,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1F2937',
        lineHeight: 36,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
    },
    optionsContainer: {
        flex: 1,
        paddingHorizontal: 24,
        gap: 12,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F3F4F6',
    },
    cardSelected: {
        borderColor: '#8B5CF6',
        backgroundColor: '#FAF5FF',
    },
    recommendedBadge: {
        position: 'absolute',
        top: -10,
        right: 16,
        backgroundColor: '#8B5CF6',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    recommendedText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    daysBox: {
        width: 56,
        height: 56,
        borderRadius: 14,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    daysNumber: {
        fontSize: 22,
        fontWeight: '700',
        color: '#4B5563',
    },
    daysNumberSelected: {
        color: '#7C3AED',
    },
    daysLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: '#9CA3AF',
        marginTop: -2,
    },
    daysLabelSelected: {
        color: '#A78BFA',
    },
    cardContent: {
        flex: 1,
    },
    cardName: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 2,
    },
    cardNameSelected: {
        color: '#7C3AED',
    },
    cardDesc: {
        fontSize: 14,
        color: '#9CA3AF',
    },
    radio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        borderColor: '#8B5CF6',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#8B5CF6',
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    ctaButton: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 10,
    },
    ctaGradient: {
        paddingVertical: 18,
        alignItems: 'center',
    },
    ctaText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
