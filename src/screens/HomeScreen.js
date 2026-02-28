import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  ImageBackground, StyleSheet, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { FEATURES } from '../data/data';
import { colors, fonts, radius, shadow } from '../theme';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation, user }) {
  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80' }}
        style={styles.hero}
      >
        <LinearGradient
          colors={['rgba(249,198,208,0.82)', 'rgba(253,232,236,0.78)']}
          style={StyleSheet.absoluteFill}
        />
        <SafeAreaView style={styles.heroInner}>
          <Text style={styles.heroTitle}>
            Where Every Sip{'\n'}Tells a <Text style={styles.heroItalic}>Story.</Text>
          </Text>
          <Text style={styles.heroSub}>
            Handcrafted coffees, artisan pastries, and a warm corner of the world — all waiting for you at Coffeecient.
          </Text>
          <View style={styles.heroBtns}>
            <TouchableOpacity onPress={() => navigation.navigate('Products')}>
              <LinearGradient colors={['#E8899A', '#C2566B']} style={styles.btnPrimary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={styles.btnPrimaryText}>Explore Our Menu</Text>
              </LinearGradient>
            </TouchableOpacity>
            {!user && (
              <TouchableOpacity style={styles.btnOutline} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.btnOutlineText}>Become a Member</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </ImageBackground>

      {/* Features */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why Coffeecient?</Text>
        <View style={styles.featuresGrid}>
          {FEATURES.map(({ image, title, desc }) => (
            <View key={title} style={styles.featureCard}>
              <Image source={{ uri: image }} style={styles.featureImg} />
              <Text style={styles.featureTitle}>{title}</Text>
              <Text style={styles.featureDesc}>{desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with <Text style={styles.footerAccent}>♥ & ☕</Text> by Coffeecient © {new Date().getFullYear()}</Text>
      </View>
    </ScrollView>
  );
}

const CARD_WIDTH = (width - 48 - 12) / 2;

const styles = StyleSheet.create({
  root:         { flex: 1, backgroundColor: colors.petal },
  hero:         { minHeight: 520, justifyContent: 'flex-end' },
  heroInner:    { padding: 32, paddingBottom: 48 },
  heroTitle:    { fontFamily: fonts.playfair, fontSize: 42, lineHeight: 50, color: colors.text },
  heroItalic:   { fontFamily: fonts.playfairItalic, color: colors.deepRose },
  heroSub:      { fontFamily: fonts.dmSans, fontSize: 15, color: colors.text, opacity: 0.8, lineHeight: 24, marginTop: 16, marginBottom: 28 },
  heroBtns:     { gap: 12 },
  btnPrimary:   { paddingVertical: 15, paddingHorizontal: 32, borderRadius: radius.full, alignItems: 'center', ...shadow.md },
  btnPrimaryText: { fontFamily: fonts.dmSansBold, fontSize: 15, color: '#fff' },
  btnOutline:   { paddingVertical: 14, paddingHorizontal: 32, borderRadius: radius.full, borderWidth: 1.5, borderColor: colors.deepRose, alignItems: 'center' },
  btnOutlineText: { fontFamily: fonts.dmSansBold, fontSize: 15, color: colors.deepRose },

  featuresSection: { padding: 24 },
  sectionTitle:    { fontFamily: fonts.playfair, fontSize: 26, color: colors.text, marginBottom: 20, textAlign: 'center' },
  featuresGrid:    { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  featureCard:     { width: CARD_WIDTH, backgroundColor: colors.white, borderRadius: radius.md, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(194,86,107,0.1)', ...shadow.sm },
  featureImg:      { width: 60, height: 60, borderRadius: 30, marginBottom: 12, borderWidth: 2, borderColor: colors.blush },
  featureTitle:    { fontFamily: fonts.playfair, fontSize: 14, color: colors.text, textAlign: 'center', marginBottom: 6 },
  featureDesc:     { fontFamily: fonts.dmSans, fontSize: 12, color: colors.muted, textAlign: 'center', lineHeight: 18 },

  footer:       { backgroundColor: colors.blush, padding: 24, alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(194,86,107,0.15)' },
  footerText:   { fontFamily: fonts.dmSans, fontSize: 13, color: colors.muted },
  footerAccent: { color: colors.deepRose },
});
