import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen    from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import AboutScreen   from '../screens/AboutScreen';
import { colors, fonts } from '../theme';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home:     '🏠',
  Products: '☕',
  About:    '🌸',
};

function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          if (!isFocused) navigation.navigate(route.name);
        };
        return (
          <TouchableOpacity key={route.key} style={styles.tabItem} onPress={onPress} activeOpacity={0.7}>
            <Text style={styles.tabIcon}>{TAB_ICONS[route.name]}</Text>
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
              {route.name}
            </Text>
            {isFocused && <View style={styles.tabDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function MainTabs({ user, setUser, navigation: rootNav }) {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Products">
        {(props) => <ProductsScreen {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="About">
        {(props) => <AboutScreen {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: 'rgba(194,86,107,0.12)',
    paddingBottom: 20,
    paddingTop: 10,
    shadowColor: '#C2566B',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },
  tabItem:      { flex: 1, alignItems: 'center', position: 'relative' },
  tabIcon:      { fontSize: 20, marginBottom: 3 },
  tabLabel:     { fontFamily: fonts.dmSansMedium, fontSize: 11, color: 'rgba(158,100,117,0.6)', letterSpacing: 0.3 },
  tabLabelActive:{ color: colors.deepRose, fontFamily: fonts.dmSansBold },
  tabDot:       { position: 'absolute', bottom: -6, width: 4, height: 4, borderRadius: 2, backgroundColor: colors.deepRose },
});
