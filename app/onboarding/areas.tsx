import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import {
    Image,
    Smartphone,
    Users,
    MessageSquare,
    Bell,
    Mail,
    Globe,
    Brain,
    Check
} from 'lucide-react-native';
import * as React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useLanguage } from '@/context/LanguageContext';

const AREAS = [
    { id: 'photos', nameKey: 'areas.photos', descKey: 'areas.photosDesc', Icon: Image },
    { id: 'apps', nameKey: 'areas.apps', descKey: 'areas.appsDesc', Icon: Smartphone },
    { id: 'social', nameKey: 'areas.social', descKey: 'areas.socialDesc', Icon: Users },
    { id: 'messages', nameKey: 'areas.messages', descKey: 'areas.messagesDesc', Icon: MessageSquare },
    { id: 'notifications', nameKey: 'areas.notifications', descKey: 'areas.notificationsDesc', Icon: Bell },
    { id: 'email', nameKey: 'areas.email', descKey: 'areas.emailDesc', Icon: Mail },
    { id: 'browser', nameKey: 'areas.browser', descKey: 'areas.browserDesc', Icon: Globe },
    { id: 'behavior', nameKey: 'areas.behavior', descKey: 'areas.behaviorDesc', Icon: Brain },
];

export default function AreasScreen() {
    const { t } = useLanguage();
    const [selected, setSelected] = React.useState<string[]>([]);

    const toggleArea = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
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
                        <View style={[styles.progressFill, { width: '66%' }]} />
                    </View>
                    <Text style={styles.progressText}>{t('onboarding.step', { current: 2, total: 3 })}</Text>
                </Animated.View>

                {/* Header */}
                <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.header}>
                    <Text style={styles.title}>{t('onboarding.areas.title')}</Text>
                    <Text style={styles.subtitle}>{t('onboarding.areas.subtitle')}</Text>
                </Animated.View>

                {/* Areas List */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {AREAS.map((area, index) => {
                        const isSelected = selected.includes(area.id);
                        const IconComponent = area.Icon;

                        return (
                            <Animated.View
                                key={area.id}
                                entering={FadeInDown.delay(150 + index * 40).duration(400)}
                            >
                                <Pressable
                                    onPress={() => toggleArea(area.id)}
                                    style={[styles.card, isSelected && styles.cardSelected]}
                                >
                                    <View style={[
                                        styles.iconContainer,
                                        isSelected && styles.iconContainerSelected
                                    ]}>
                                        <IconComponent
                                            size={22}
                                            color={isSelected ? '#7C3AED' : '#6B7280'}
                                            strokeWidth={1.5}
                                        />
                                    </View>
                                    <View style={styles.cardContent}>
                                        <Text style={[styles.cardName, isSelected && styles.cardNameSelected]}>
                                            {t(area.nameKey)}
                                        </Text>
                                        <Text style={styles.cardDesc}>{t(area.descKey)}</Text>
                                    </View>
                                    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                                        {isSelected && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                                    </View>
                                </Pressable>
                            </Animated.View>
                        );
                    })}
                </ScrollView>

                {/* Footer */}
                <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.footer}>
                    <Pressable
                        onPress={() => router.push('/onboarding/duration')}
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
        marginBottom: 20,
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
    scrollView: {
        flex: 1,
    },
    listContainer: {
        paddingHorizontal: 24,
        paddingBottom: 16,
        gap: 10,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F3F4F6',
    },
    cardSelected: {
        borderColor: '#8B5CF6',
        backgroundColor: '#FAF5FF',
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    iconContainerSelected: {
        backgroundColor: '#EDE9FE',
    },
    cardContent: {
        flex: 1,
    },
    cardName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 2,
    },
    cardNameSelected: {
        color: '#7C3AED',
    },
    cardDesc: {
        fontSize: 13,
        color: '#9CA3AF',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxSelected: {
        backgroundColor: '#8B5CF6',
        borderColor: '#8B5CF6',
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
});
