import { Tabs } from 'expo-router';
import { Home, Calendar, BarChart3 } from 'lucide-react-native';
import { View, StyleSheet, Platform } from 'react-native';
import { useLanguage } from '@/context/LanguageContext';

export default function TabLayout() {
    const { t } = useLanguage();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: Platform.OS === 'ios' ? 88 : 70,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderTopWidth: 0,
                    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
                    paddingTop: 12,
                    shadowColor: '#8B5CF6',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 20,
                    elevation: 20,
                },
                tabBarActiveTintColor: '#8B5CF6',
                tabBarInactiveTintColor: '#9CA3AF',
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 4,
                },
                tabBarItemStyle: {
                    paddingTop: 4,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: t('home.title'),
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
                            <Home size={26} color={color} strokeWidth={focused ? 2 : 1.5} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="timeline"
                options={{
                    title: t('timeline.title'),
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
                            <Calendar size={26} color={color} strokeWidth={focused ? 2 : 1.5} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="stats"
                options={{
                    title: t('stats.tabTitle'),
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
                            <BarChart3 size={26} color={color} strokeWidth={focused ? 2 : 1.5} />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        width: 44,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },
    iconContainerActive: {
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
    },
});
