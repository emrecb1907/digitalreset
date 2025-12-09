import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import { Settings, Share2, RefreshCw, Flame, Target, Heart, Sparkles } from 'lucide-react-native';
import * as React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
    FadeInDown,
    FadeIn,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withRepeat,
    withTiming
} from 'react-native-reanimated';
import { useLanguage } from '@/context/LanguageContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DayScreen() {
    const { t } = useLanguage();
    const insets = useSafeAreaInsets();
    const [taskComplete, setTaskComplete] = React.useState(false);
    const [detoxChecked, setDetoxChecked] = React.useState(false);
    const progress = useSharedValue(0);
    const sparkle = useSharedValue(1);

    React.useEffect(() => {
        sparkle.value = withRepeat(
            withTiming(1.2, { duration: 1500 }),
            -1,
            true
        );
    }, []);

    const handleComplete = () => {
        setTaskComplete(true);
        progress.value = withSpring(100);
    };

    const progressStyle = useAnimatedStyle(() => ({
        width: `${progress.value}%`,
    }));

    const sparkleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: sparkle.value }],
    }));

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
                    contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Premium Header */}
                    <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
                        <View style={styles.headerLeft}>
                            <View style={styles.dayBadge}>
                                <LinearGradient
                                    colors={['#8B5CF6', '#7C3AED']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.dayBadgeGradient}
                                >
                                    <Text style={styles.dayBadgeText}>{t('timeline.day').toUpperCase()}</Text>
                                    <Text style={styles.dayBadgeNumber}>1</Text>
                                </LinearGradient>
                            </View>
                            <View style={styles.headerText}>
                                <Text style={styles.welcomeText}>{t('home.welcome')}</Text>
                                <Text style={styles.journeyText}>{t('home.journey')}</Text>
                            </View>
                        </View>
                        <View style={styles.headerActions}>
                            <Pressable style={styles.actionButton}>
                                <LinearGradient
                                    colors={['#FFFFFF', '#FAFAFA']}
                                    style={styles.actionButtonGradient}
                                >
                                    <Share2 size={18} color="#6B7280" strokeWidth={1.5} />
                                </LinearGradient>
                            </Pressable>
                            <Pressable
                                style={styles.actionButton}
                                onPress={() => router.push('/settings')}
                            >
                                <LinearGradient
                                    colors={['#FFFFFF', '#FAFAFA']}
                                    style={styles.actionButtonGradient}
                                >
                                    <Settings size={18} color="#6B7280" strokeWidth={1.5} />
                                </LinearGradient>
                            </Pressable>
                        </View>
                    </Animated.View>

                    {/* Task Card */}
                    <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.taskCard}>
                        <View style={styles.taskHeader}>
                            <View style={styles.taskBadge}>
                                <Target size={14} color="#6366F1" strokeWidth={2} />
                                <Text style={styles.taskBadgeText}>{t('home.todayTask')}</Text>
                            </View>
                            <Pressable style={styles.changeButton}>
                                <RefreshCw size={14} color="#8B5CF6" strokeWidth={2} />
                                <Text style={styles.changeText}>{t('home.change')}</Text>
                            </Pressable>
                        </View>

                        <Text style={styles.taskTitle}>{t('home.taskTitle')}</Text>
                        <Text style={styles.taskDesc}>{t('home.taskDesc')}</Text>

                        {/* Progress Bar */}
                        <View style={styles.progressSection}>
                            <View style={styles.progressTrack}>
                                <Animated.View style={[styles.progressFill, progressStyle]} />
                            </View>
                            <Text style={styles.progressText}>{taskComplete ? '100%' : '0%'}</Text>
                        </View>

                        {/* Complete Button */}
                        <Pressable
                            onPress={handleComplete}
                            disabled={taskComplete}
                            style={styles.completeButtonWrapper}
                        >
                            <LinearGradient
                                colors={taskComplete ? ['#10B981', '#059669'] : ['#8B5CF6', '#7C3AED']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.completeButton}
                            >
                                <Text style={styles.completeButtonText}>
                                    {taskComplete ? t('home.completed') : t('home.markComplete')}
                                </Text>
                            </LinearGradient>
                        </Pressable>
                    </Animated.View>

                    {/* Detox Card */}
                    <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.detoxCard}>
                        <View style={styles.detoxBadge}>
                            <Heart size={14} color="#EC4899" strokeWidth={2} />
                            <Text style={styles.detoxBadgeText}>{t('home.todayDetox')}</Text>
                        </View>

                        <Text style={styles.detoxTitle}>{t('home.detoxTitle')}</Text>
                        <Text style={styles.detoxDesc}>{t('home.detoxDesc')}</Text>

                        <Pressable
                            onPress={() => setDetoxChecked(!detoxChecked)}
                            style={styles.detoxCheckRow}
                        >
                            <View style={[styles.checkbox, detoxChecked && styles.checkboxChecked]}>
                                {detoxChecked && <Text style={styles.checkmark}>✓</Text>}
                            </View>
                            <Text style={styles.detoxCheckText}>{t('home.commit')}</Text>
                        </Pressable>
                    </Animated.View>

                    {/* Stats Row */}
                    <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <View style={styles.statIconContainer}>
                                <Flame size={22} color="#F59E0B" strokeWidth={1.5} />
                            </View>
                            <Text style={styles.statValue}>1</Text>
                            <Text style={styles.statLabel}>{t('home.dayStreak')}</Text>
                        </View>
                        <View style={styles.statCard}>
                            <View style={styles.statIconContainer}>
                                <Target size={22} color="#10B981" strokeWidth={1.5} />
                            </View>
                            <Text style={styles.statValue}>{taskComplete ? 1 : 0}</Text>
                            <Text style={styles.statLabel}>{t('home.tasksDone')}</Text>
                        </View>
                        <View style={styles.statCard}>
                            <View style={styles.statIconContainer}>
                                <Heart size={22} color="#EC4899" strokeWidth={1.5} />
                            </View>
                            <Text style={styles.statValue}>{detoxChecked ? 1 : 0}</Text>
                            <Text style={styles.statLabel}>{t('home.detoxDone')}</Text>
                        </View>
                    </Animated.View>

                    {/* Tip Card */}
                    <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.tipCard}>
                        <LinearGradient
                            colors={['#FAF5FF', '#EDE9FE']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.tipGradient}
                        >
                            <Animated.View style={sparkleStyle}>
                                <Sparkles size={20} color="#8B5CF6" strokeWidth={1.5} />
                            </Animated.View>
                            <View style={styles.tipContent}>
                                <Text style={styles.tipTitle}>{t('home.proTip')}</Text>
                                <Text style={styles.tipText}>{t('home.tipText')}</Text>
                            </View>
                        </LinearGradient>
                    </Animated.View>
                </ScrollView>
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
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 28,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    dayBadge: {
        marginRight: 14,
    },
    dayBadgeGradient: {
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 8,
    },
    dayBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.8)',
        letterSpacing: 0.5,
    },
    dayBadgeNumber: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FFFFFF',
        marginTop: -2,
    },
    headerText: {
        flex: 1,
    },
    welcomeText: {
        fontSize: 14,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    journeyText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginTop: 2,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        borderRadius: 14,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    actionButtonGradient: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    taskCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 22,
        marginBottom: 16,
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 6,
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
    },
    taskBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF2FF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        gap: 6,
    },
    taskBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#6366F1',
        letterSpacing: 0.5,
    },
    changeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    changeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8B5CF6',
    },
    taskTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 6,
    },
    taskDesc: {
        fontSize: 15,
        color: '#6B7280',
        marginBottom: 22,
        lineHeight: 22,
    },
    progressSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
    },
    progressTrack: {
        flex: 1,
        height: 10,
        backgroundColor: '#F3F4F6',
        borderRadius: 5,
        marginRight: 14,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#10B981',
        borderRadius: 5,
    },
    progressText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        width: 40,
        textAlign: 'right',
    },
    completeButtonWrapper: {
        borderRadius: 14,
        overflow: 'hidden',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    completeButton: {
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 14,
    },
    completeButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    detoxCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 22,
        marginBottom: 16,
        borderWidth: 1.5,
        borderColor: '#FCE7F3',
    },
    detoxBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 16,
    },
    detoxBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#EC4899',
        letterSpacing: 0.5,
    },
    detoxTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 6,
    },
    detoxDesc: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 18,
        lineHeight: 21,
    },
    detoxCheckRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 26,
        height: 26,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    checkboxChecked: {
        backgroundColor: '#8B5CF6',
        borderColor: '#8B5CF6',
    },
    checkmark: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
    detoxCheckText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#374151',
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
    },
    statIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: '#F9FAFB',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
    },
    statLabel: {
        fontSize: 11,
        color: '#9CA3AF',
        marginTop: 2,
        fontWeight: '500',
    },
    tipCard: {
        borderRadius: 18,
        overflow: 'hidden',
    },
    tipGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        gap: 14,
    },
    tipContent: {
        flex: 1,
    },
    tipTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#7C3AED',
        marginBottom: 2,
    },
    tipText: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
});
