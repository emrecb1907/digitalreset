import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import {
    Image,
    Smartphone,
    Users,
    FileText,
    HardDrive,
    Mail,
    Flame,
    Heart,
    Share2
} from 'lucide-react-native';
import * as React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Share } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useLanguage } from '@/context/LanguageContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StatsScreen() {
    const { t } = useLanguage();
    const insets = useSafeAreaInsets();

    const STATS = [
        { Icon: Image, value: '3,400', labelKey: 'stats.photosDeleted' },
        { Icon: Smartphone, value: '12', labelKey: 'stats.appsRemoved' },
        { Icon: Users, value: '24', labelKey: 'stats.unfollowed' },
        { Icon: FileText, value: '64', labelKey: 'stats.postsDeleted' },
        { Icon: HardDrive, value: '2.2GB', labelKey: 'stats.spaceFreed' },
        { Icon: Mail, value: '156', labelKey: 'stats.emailsCleaned' },
    ];

    const handleShare = async () => {
        try {
            await Share.share({
                message: '🎉 I\'ve completed 9 days of Digital Reset! Deleted 3,400 photos and freed 2.2GB of storage. Join me on the 30-day digital detox journey!',
            });
        } catch (error) {
            console.error(error);
        }
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

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
                        <Text style={styles.title}>{t('stats.title')}</Text>
                        <Text style={styles.subtitle}>{t('stats.subtitle')}</Text>
                    </Animated.View>

                    {/* Progress Card */}
                    <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.progressCard}>
                        <View style={styles.progressHeader}>
                            <Text style={styles.progressTitle}>{t('stats.overallProgress')}</Text>
                            <View style={styles.progressDays}>
                                <Text style={styles.progressNumber}>9</Text>
                                <Text style={styles.progressTotal}>/30</Text>
                            </View>
                        </View>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: '30%' }]} />
                        </View>
                        <Text style={styles.progressText}>{t('stats.daysRemaining', { count: 21 })}</Text>
                    </Animated.View>

                    {/* Stats Grid */}
                    <View style={styles.statsGrid}>
                        {STATS.map((stat, index) => {
                            const IconComponent = stat.Icon;
                            return (
                                <Animated.View
                                    key={index}
                                    entering={FadeInDown.delay(150 + index * 50).duration(400)}
                                    style={styles.statCard}
                                >
                                    <IconComponent size={24} color="#8B5CF6" strokeWidth={1.5} />
                                    <Text style={styles.statValue}>{stat.value}</Text>
                                    <Text style={styles.statLabel}>{t(stat.labelKey)}</Text>
                                </Animated.View>
                            );
                        })}
                    </View>

                    {/* Streak & Detox Row */}
                    <Animated.View entering={FadeInDown.delay(450).duration(500)} style={styles.miniRow}>
                        <View style={styles.miniCard}>
                            <Flame size={24} color="#F59E0B" strokeWidth={1.5} />
                            <View style={styles.miniContent}>
                                <Text style={styles.miniValue}>9 {t('stats.dayStreak')}</Text>
                                <Text style={styles.miniLabel}>{t('stats.keepGoing')}</Text>
                            </View>
                        </View>
                        <View style={styles.miniCard}>
                            <Heart size={24} color="#EC4899" strokeWidth={1.5} />
                            <View style={styles.miniContent}>
                                <Text style={styles.miniValue}>7 {t('stats.detoxDone')}</Text>
                                <Text style={styles.miniLabel}>{t('stats.buildingHabits')}</Text>
                            </View>
                        </View>
                    </Animated.View>

                    {/* Share Button */}
                    <Animated.View entering={FadeInDown.delay(500).duration(500)}>
                        <Pressable onPress={handleShare} style={styles.shareButton}>
                            <Share2 size={20} color="#1F2937" strokeWidth={1.5} />
                            <Text style={styles.shareButtonText}>{t('stats.shareResults')}</Text>
                        </Pressable>
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
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    header: {
        marginBottom: 24,
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
    progressCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 22,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 4,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    progressTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    progressDays: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    progressNumber: {
        fontSize: 28,
        fontWeight: '700',
        color: '#8B5CF6',
    },
    progressTotal: {
        fontSize: 16,
        fontWeight: '600',
        color: '#9CA3AF',
    },
    progressBar: {
        height: 10,
        backgroundColor: '#F3F4F6',
        borderRadius: 5,
        marginBottom: 10,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#8B5CF6',
        borderRadius: 5,
    },
    progressText: {
        fontSize: 13,
        color: '#6B7280',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 16,
    },
    statCard: {
        width: '47%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1F2937',
        marginTop: 10,
    },
    statLabel: {
        fontSize: 13,
        color: '#9CA3AF',
        marginTop: 4,
        textAlign: 'center',
    },
    miniRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    miniCard: {
        flex: 1,
        backgroundColor: '#FAF5FF',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    miniContent: {
        marginLeft: 14,
    },
    miniValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#7C3AED',
    },
    miniLabel: {
        fontSize: 12,
        color: '#A78BFA',
        marginTop: 2,
    },
    shareButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    shareButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
});
