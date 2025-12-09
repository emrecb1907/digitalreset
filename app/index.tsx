import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSpring,
  withDelay,
  FadeIn,
  FadeInDown,
} from 'react-native-reanimated';
import { useLanguage } from '@/context/LanguageContext';

const { width } = Dimensions.get('window');

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SplashScreen() {
  const { t } = useLanguage();
  const scale = useSharedValue(1);
  const opacity1 = useSharedValue(0.3);
  const opacity2 = useSharedValue(0.2);

  React.useEffect(() => {
    // Logo pulse animation
    scale.value = withRepeat(
      withTiming(1.05, { duration: 2000 }),
      -1,
      true
    );
    // Ambient circles animation
    opacity1.value = withRepeat(
      withTiming(0.5, { duration: 3000 }),
      -1,
      true
    );
    opacity2.value = withRepeat(
      withDelay(1000, withTiming(0.4, { duration: 4000 })),
      -1,
      true
    );
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const circle1Style = useAnimatedStyle(() => ({
    opacity: opacity1.value,
  }));

  const circle2Style = useAnimatedStyle(() => ({
    opacity: opacity2.value,
  }));

  const handlePress = () => {
    router.push('/onboarding/platforms');
  };

  return (
    <>
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Background */}
        <LinearGradient
          colors={['#FFFFFF', '#FAFBFF', '#F5F3FF']}
          style={StyleSheet.absoluteFill}
        />

        {/* Animated ambient circles */}
        <Animated.View style={[styles.circle1, circle1Style]} />
        <Animated.View style={[styles.circle2, circle2Style]} />

        {/* Content */}
        <View style={styles.content}>
          {/* Logo */}
          <Animated.View
            entering={FadeIn.duration(800)}
            style={[styles.logoContainer, logoStyle]}
          >
            <LinearGradient
              colors={['#7C3AED', '#8B5CF6']}
              style={styles.logoGradient}
            >
              <Sparkles size={40} color="#FFFFFF" strokeWidth={1.5} />
            </LinearGradient>
          </Animated.View>

          {/* App Name */}
          <Animated.Text
            entering={FadeInDown.delay(200).duration(600)}
            style={styles.appName}
          >
            Digital Reset
          </Animated.Text>

          {/* Tagline */}
          <Animated.Text
            entering={FadeInDown.delay(400).duration(600)}
            style={styles.tagline}
          >
            {t('splash.tagline')}
          </Animated.Text>

          {/* Features */}
          <Animated.View
            entering={FadeInDown.delay(600).duration(600)}
            style={styles.features}
          >
            <FeatureItem text={t('splash.feature1')} />
            <FeatureItem text={t('splash.feature2')} />
            <FeatureItem text={t('splash.feature3')} />
          </Animated.View>
        </View>

        {/* Bottom CTA */}
        <Animated.View
          entering={FadeInDown.delay(800).duration(600)}
          style={styles.bottomSection}
        >
          <Pressable onPress={handlePress} style={styles.ctaButton}>
            <LinearGradient
              colors={['#7C3AED', '#6D28D9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaGradient}
            >
              <Text style={styles.ctaText}>{t('splash.getStarted')}</Text>
            </LinearGradient>
          </Pressable>

          <Text style={styles.privacyText}>
            {t('splash.privacy')}
          </Text>
        </Animated.View>
      </View>
    </>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureDot} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle1: {
    position: 'absolute',
    top: -50,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#8B5CF6',
  },
  circle2: {
    position: 'absolute',
    bottom: 100,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#A78BFA',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoGradient: {
    width: 88,
    height: 88,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  appName: {
    fontSize: 34,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 17,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 48,
  },
  features: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B5CF6',
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 50,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  privacyText: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 20,
  },
});
