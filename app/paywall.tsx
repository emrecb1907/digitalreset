import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import {
    Check,
    Calendar,
    Sparkles,
    RefreshCw,
    BarChart3,
    Infinity,
    X
} from 'lucide-react-native';
import * as React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useLanguage } from '@/context/LanguageContext';

export default function PaywallScreen() {
    const { t } = useLanguage();

    const FEATURES = [
        { Icon: Calendar, textKey: 'paywall.feature1' },
        { Icon: Sparkles, textKey: 'paywall.feature2' },
        { Icon: RefreshCw, textKey: 'paywall.feature3' },
        { Icon: BarChart3, textKey: 'paywall.feature4' },
        { Icon: Infinity, textKey: 'paywall.feature5' },
    ];

    return (
        <>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <LinearGradient
                    colors={['#FFFFFF', '#FAF5FF', '#F5F3FF']}
                    style={StyleSheet.absoluteFill}
                />

                {/* Close Button */}
                <Animated.View entering={FadeIn.duration(300)} style={styles.closeButton}>
                    <Pressable onPress={() => router.back()} style={styles.closeButtonInner}>
                        <X size={24} color="#6B7280" strokeWidth={1.5} />
                    </Pressable>
                </Animated.View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Icon */}
                    <Animated.View entering={FadeIn.delay(100).duration(500)} style={styles.iconContainer}>
                        <LinearGradient
                            colors={['#8B5CF6', '#7C3AED']}
                            style={styles.iconGradient}
                        >
                            <Sparkles size={36} color="#FFFFFF" strokeWidth={1.5} />
                        </LinearGradient>
                    </Animated.View>

                    {/* Title */}
                    <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.header}>
                        <Text style={styles.title}>{t('paywall.title')}</Text>
                        <Text style={styles.subtitle}>{t('paywall.subtitle')}</Text>
                    </Animated.View>

                    {/* Features */}
                    <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.featuresCard}>
                        {FEATURES.map((feature, index) => {
                            const IconComponent = feature.Icon;
                            return (
                                <View key={index} style={styles.featureRow}>
                                    <View style={styles.featureIcon}>
                                        <IconComponent size={20} color="#8B5CF6" strokeWidth={1.5} />
                                    </View>
                                    <Text style={styles.featureText}>{t(feature.textKey)}</Text>
                                    <Check size={18} color="#10B981" strokeWidth={2} />
                                </View>
                            );
                        })}
                    </Animated.View>

                    {/* Price Card */}
                    <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.priceCard}>
                        <View style={styles.priceBadge}>
                            <Text style={styles.priceBadgeText}>{t('paywall.oneTime')}</Text>
                        </View>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceAmount}>$6.99</Text>
                            <Text style={styles.priceDesc}>{t('paywall.lifetime')}</Text>
                        </View>
                        <Text style={styles.priceNote}>{t('paywall.noHidden')}</Text>
                    </Animated.View>

                    {/* Guarantee */}
                    <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.guarantee}>
                        <Text style={styles.guaranteeText}>{t('paywall.guarantee')}</Text>
                    </Animated.View>
                </ScrollView>

                {/* Footer */}
                <Animated.View entering={FadeInDown.delay(600).duration(500)} style={styles.footer}>
                    <Pressable style={styles.purchaseButton}>
                        <LinearGradient
                            colors={['#8B5CF6', '#7C3AED']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.purchaseGradient}
                        >
                            <Text style={styles.purchaseText}>{t('paywall.unlock')}</Text>
                        </LinearGradient>
                    </Pressable>

                    <Pressable style={styles.restoreButton}>
                        <Text style={styles.restoreText}>{t('paywall.restore')}</Text>
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
    closeButton: {
        position: 'absolute',
        top: 56,
        right: 20,
        zIndex: 10,
    },
    closeButtonInner: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 100,
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    iconContainer: {
        alignSelf: 'center',
        marginBottom: 28,
    },
    iconGradient: {
        width: 80,
        height: 80,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 12,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
    },
    featuresCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 4,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    featureIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#FAF5FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    featureText: {
        flex: 1,
        fontSize: 16,
        color: '#374151',
        fontWeight: '500',
    },
    priceCard: {
        backgroundColor: '#FAF5FF',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E9D5FF',
        marginBottom: 16,
    },
    priceBadge: {
        backgroundColor: '#8B5CF6',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 16,
    },
    priceBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    priceRow: {
        alignItems: 'center',
        marginBottom: 8,
    },
    priceAmount: {
        fontSize: 48,
        fontWeight: '700',
        color: '#7C3AED',
    },
    priceDesc: {
        fontSize: 16,
        color: '#8B5CF6',
        fontWeight: '500',
        marginTop: 4,
    },
    priceNote: {
        fontSize: 14,
        color: '#9CA3AF',
    },
    guarantee: {
        alignItems: 'center',
        marginBottom: 20,
    },
    guaranteeText: {
        fontSize: 14,
        color: '#10B981',
        fontWeight: '500',
    },
    footer: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    purchaseButton: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 12,
    },
    purchaseGradient: {
        paddingVertical: 18,
        alignItems: 'center',
    },
    purchaseText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    restoreButton: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    restoreText: {
        fontSize: 15,
        color: '#8B5CF6',
        fontWeight: '500',
    },
});
