import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import { Lock, Check } from 'lucide-react-native';
import * as React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useLanguage } from '@/context/LanguageContext';

const DAYS = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    status: i === 0 ? 'current' : 'locked',
}));

export default function TimelineScreen() {
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

                {/* Header */}
                <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
                    <Text style={styles.title}>{t('timeline.title')}</Text>
                    <Text style={styles.subtitle}>{t('timeline.subtitle')}</Text>
                </Animated.View>

                {/* Progress Summary */}
                <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.summaryCard}>
                    <View style={styles.summaryLeft}>
                        <Text style={styles.summaryNumber}>1</Text>
                        <Text style={styles.summaryOf}>/30</Text>
                    </View>
                    <View style={styles.summaryRight}>
                        <View style={styles.summaryProgress}>
                            <View style={[styles.summaryProgressFill, { width: '3.3%' }]} />
                        </View>
                        <Text style={styles.summaryText}>{t('timeline.daysRemaining', { count: 29 })}</Text>
                    </View>
                </Animated.View>

                {/* Days Grid */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.gridContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.grid}>
                        {DAYS.map((item, index) => {
                            const isCurrent = item.status === 'current';
                            const isLocked = item.status === 'locked';

                            return (
                                <Animated.View
                                    key={item.day}
                                    entering={FadeInDown.delay(50 + index * 15).duration(300)}
                                >
                                    <Pressable
                                        onPress={() => {
                                            if (isLocked) router.push('/paywall');
                                        }}
                                        style={[styles.dayCard, isCurrent && styles.dayCardCurrent]}
                                    >
                                        {isCurrent ? (
                                            <>
                                                <Text style={styles.dayNumberCurrent}>{item.day}</Text>
                                                <Text style={styles.dayLabelCurrent}>{t('timeline.today')}</Text>
                                            </>
                                        ) : (
                                            <>
                                                <Lock size={14} color="#9CA3AF" strokeWidth={2} />
                                                <Text style={styles.dayNumberLocked}>{item.day}</Text>
                                            </>
                                        )}
                                    </Pressable>
                                </Animated.View>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 15,
        color: '#6B7280',
    },
    summaryCard: {
        marginHorizontal: 24,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 4,
    },
    summaryLeft: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginRight: 20,
    },
    summaryNumber: {
        fontSize: 36,
        fontWeight: '700',
        color: '#8B5CF6',
    },
    summaryOf: {
        fontSize: 16,
        fontWeight: '600',
        color: '#9CA3AF',
    },
    summaryRight: {
        flex: 1,
    },
    summaryProgress: {
        height: 6,
        backgroundColor: '#F3F4F6',
        borderRadius: 3,
        marginBottom: 8,
        overflow: 'hidden',
    },
    summaryProgressFill: {
        height: '100%',
        backgroundColor: '#8B5CF6',
        borderRadius: 3,
    },
    summaryText: {
        fontSize: 13,
        color: '#6B7280',
    },
    scrollView: {
        flex: 1,
    },
    gridContainer: {
        paddingBottom: 100,
        alignItems: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    dayCard: {
        width: 58,
        height: 64,
        backgroundColor: '#F3F4F6',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayCardCurrent: {
        backgroundColor: '#8B5CF6',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 6,
    },
    dayNumberCurrent: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    dayLabelCurrent: {
        fontSize: 10,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.8)',
        marginTop: 2,
    },
    dayNumberLocked: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9CA3AF',
        marginTop: 4,
    },
});
