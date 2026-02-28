import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_400Regular_Italic } from '@expo-google-fonts/playfair-display';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';

import OnboardingScreen from './src/screens/OnboardingScreen';
import AuthScreen       from './src/screens/AuthScreen';
import MainTabs         from './src/navigation/MainTabs';
import { colors }       from './src/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular_Italic,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.petal }}>
        <ActivityIndicator size="large" color={colors.deepRose} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
          {/* Onboarding always first — replaced after completion */}
          <Stack.Screen name="Onboarding">
            {(props) => <OnboardingScreen {...props} />}
          </Stack.Screen>

          <Stack.Screen name="Auth">
            {(props) => <AuthScreen {...props} setUser={setUser} />}
          </Stack.Screen>

          {/* Shortcut aliases used in OnboardingScreen */}
          <Stack.Screen name="Login">
            {(props) => <AuthScreen {...props} route={{ params: { mode: 'login' } }} setUser={setUser} />}
          </Stack.Screen>
          <Stack.Screen name="Register">
            {(props) => <AuthScreen {...props} route={{ params: { mode: 'register' } }} setUser={setUser} />}
          </Stack.Screen>

          <Stack.Screen name="Main">
            {(props) => <MainTabs {...props} user={user} setUser={setUser} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
