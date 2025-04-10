import { Tabs } from 'expo-router';
import { Theme } from './theme';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarLabelStyle: {
          fontFamily: Theme.fonts.medium,
          fontSize: Theme.sizes.small,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Cache la barre d'onglets
        }}
      />
      <Tabs.Screen
        name="signUp"
        options={{
          title: 'Sign Up',
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Cache la barre d'onglets
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Cache la barre d'onglets
        }}
      />
    </Tabs>
  );
}