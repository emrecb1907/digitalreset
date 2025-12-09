import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import { Check } from 'lucide-react-native';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useLanguage } from '@/context/LanguageContext';

const PLATFORMS = [
    { id: 'instagram', name: 'Instagram', icon: 'logo-instagram', lib: 'Ionicons', color: '#E4405F' },
    { id: 'tiktok', name: 'TikTok', icon: 'logo-tiktok', lib: 'Ionicons', color: '#000000' },
    { id: 'twitter', name: 'Twitter/X', icon: 'logo-twitter', lib: 'Ionicons', color: '#1DA1F2' },
    { id: 'whatsapp', name: 'WhatsApp', icon: 'logo-whatsapp', lib: 'Ionicons', color: '#25D366' },
    { id: 'telegram', name: 'Telegram', icon: 'telegram', lib: 'FontAwesome5', color: '#0088CC' },
    { id: 'youtube', name: 'YouTube', icon: 'logo-youtube', lib: 'Ionicons', color: '#FF0000' },
    { id: 'facebook', name: 'Facebook', icon: 'logo-facebook', lib: 'Ionicons', color: '#1877F2' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'logo-linkedin', lib: 'Ionicons', color: '#0A66C2' },
    { id: 'reddit', name: 'Reddit', icon: 'logo-reddit', lib: 'Ionicons', color: '#FF4500' },
];

function SocialIcon({ icon, lib, color, size = 32 }: { icon: string; lib: string; color: string; size?: number }) {
    if (lib === 'Ionicons') {
        return <Ionicons name={icon as any} size={size} color={color} />;
    }
    if (lib === 'FontAwesome5') {
        return <FontAwesome5 name={icon} size={size} color={color} />;
    }
    return <FontAwesome name={icon as any} size={size} color={color} />;
}

export default function PlatformsScreen() {
    const { t } = useLanguage();
    const [selected, setSelected] = React.useState<string[]>([]);

    const togglePlatform = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
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

                {/* Progress */}
                <Animated.View entering={FadeIn.duration(400)} style={styles.progressBar}>
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: '33%' }]} />
                    </View>
                    <Text style={styles.progressText}>{t('onboarding.step', { current: 1, total: 3 })}</Text>
                </Animated.View>

                {/* Header */}
                <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.header}>
                    <Text style={styles.title}>{t('onboarding.platforms.title')}</Text>
                    <Text style={styles.subtitle}>{t('onboarding.platforms.subtitle')}</Text>
                </Animated.View>

                {/* Platform Grid */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.gridContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.grid}>
                        {PLATFORMS.map((platform, index) => {
                            const isSelected = selected.includes(platform.id);

                            return (
                                <Animated.View
                                    key={platform.id}
                                    entering={FadeInDown.delay(150 + index * 50).duration(400)}
                                    style={styles.cardWrapper}
                                >
                                    <Pressable
                                        onPress={() => togglePlatform(platform.id)}
                                        style={[styles.card, isSelected && styles.cardSelected]}
                                    >
                                        <View style={styles.iconContainer}>
                                            <SocialIcon
                                                icon={platform.icon}
                                                lib={platform.lib}
                                                color={platform.color}
                                                size={36}
                                            />
                                        </View>
                                        <Text style={[
                                            styles.cardName,
                                            isSelected && styles.cardNameSelected
                                        ]}>
                                            {platform.name}
                                        </Text>
                                        {isSelected && (
                                            <View style={styles.checkBadge}>
                                                <Check size={12} color="#FFFFFF" strokeWidth={3} />
                                            </View>
                                        )}
                                    </Pressable>
                                </Animated.View>
                            );
                        })}
                    </View>
                </ScrollView>

                {/* Footer */}
                <Animated.View entering={FadeInDown.delay(600).duration(500)} style={styles.footer}>
                    <Pressable
                        onPress={() => router.push('/onboarding/areas')}
                        disabled={selected.length === 0}
                        style={[styles.ctaButton, selected.length === 0 && styles.ctaButtonDisabled]}
                    >
                        <LinearGradient
                            colors={selected.length > 0 ? ['#7C3AED', '#6D28D9'] : ['#D1D5DB', '#D1D5DB']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.ctaGradient}
                        >
                            <Text style={styles.ctaText}>{t('continue')}</Text>
                        </LinearGradient>
                    </Pressable>
                    <Text style={styles.selectionText}>
                        {selected.length === 0
                            ? t('onboarding.platforms.selectOne')
                            : t('onboarding.platforms.selected', { count: selected.length })}
                    </Text>
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
        marginBottom: 24,
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
        lineHeight: 24,
    },
    scrollView: {
        flex: 1,
    },
    gridContainer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cardWrapper: {
        width: '31%',
        marginBottom: 12,
    },
    card: {
        aspectRatio: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#F3F4F6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    cardSelected: {
        borderColor: '#8B5CF6',
        backgroundColor: '#FAF5FF',
    },
    iconContainer: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    cardName: {
        fontSize: 11,
        fontWeight: '600',
        color: '#4B5563',
        textAlign: 'center',
    },
    cardNameSelected: {
        color: '#7C3AED',
    },
    checkBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#8B5CF6',
        alignItems: 'center',
        justifyContent: 'center',
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
    ctaButtonDisabled: {
        shadowOpacity: 0,
        elevation: 0,
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
    selectionText: {
        fontSize: 14,
        color: '#9CA3AF',
        textAlign: 'center',
        marginTop: 16,
    },
});
