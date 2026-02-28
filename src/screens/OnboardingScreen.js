import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, Dimensions, Animated, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadow } from '../theme';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    key: 'welcome',
    title: 'Every sip tells\na ',
    titleItalic: 'story.',
    sub: 'Handcrafted coffees, artisan pastries, and a warm corner of the world — all waiting for you at Coffeecient.',
  },
  {
    key: 'menu',
    badge: 'Our Menu',
    title: 'Crafted with ',
    titleItalic: 'heart',
    titleEnd: ' & bloom.',
    sub: 'From signature espressos to oat milk lattes — every cup is made to order, exactly the way you love it.',
  },
  {
    key: 'rewards',
    title: 'Join ',
    titlePink: 'Coffeecient\n',
    titleEnd: 'Rewards ✦',
    sub: 'Earn petals with every purchase. Redeem for free drinks, secret menu items, and early access to new arrivals.',
    dark: true,
  },
];

const MENU_ITEMS = [
  { emoji: '☕', name: 'Espresso Classico', price: '₱199', active: true },
  { emoji: '🥛', name: 'Oat Milk Latte',   price: '₱299' },
  { emoji: '🍫', name: 'Mocha Noir',        price: '₱249' },
];

const PERKS = [
  { emoji: '🌸', title: 'Earn Petals',   desc: '1 petal per ₱10 spent on any order' },
  { emoji: '🎁', title: 'Free Drinks',   desc: 'Redeem 50 petals for your favourite drink' },
  { emoji: '⚡', title: 'Skip the Line', desc: 'Order ahead and pick up in 5 minutes' },
];

export default function OnboardingScreen({ navigation }) {
  const [current, setCurrent] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const advance = (next) => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => {
      setCurrent(next);
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    });
  };

  const handleCTA = () => {
    if (current < 2) { advance(current + 1); return; }
    navigation.replace('Register');
  };

  const isDark = current === 2;

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.slideContainer, { opacity: fadeAnim }]}>

        {/* ── Slide 0: Welcome ── */}
        {current === 0 && (
          <LinearGradient colors={['#F7C5D0', '#FFF0F3']} style={styles.fill} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }}>
            <SafeAreaView style={styles.fill}>
              {/* Blobs */}
              <View style={[styles.blob, { width: 280, height: 280, backgroundColor: colors.rose, top: -80, right: -60 }]} />
              <View style={[styles.blob, { width: 200, height: 200, backgroundColor: colors.deepRose, top: height * 0.3, left: -70, opacity: 0.18 }]} />

              <ScrollView contentContainerStyle={styles.s0Content} showsVerticalScrollIndicator={false}>
                <View style={styles.logoMark}>
                  <Text style={styles.logoEmoji}>☕</Text>
                </View>
                <Text style={styles.brandName}>COFFEECIENT</Text>

                {/* Cup illustration */}
                <View style={styles.cupWrap}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80' }}
                    style={styles.cupImage}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(247,197,208,0.6)']}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0.4 }}
                    end={{ x: 0, y: 1 }}
                  />
                </View>

                <Text style={styles.s0Title}>
                  Every sip tells{'\n'}a <Text style={styles.italic}>story.</Text>
                </Text>
                <Text style={styles.s0Sub}>{SLIDES[0].sub}</Text>
              </ScrollView>
            </SafeAreaView>
          </LinearGradient>
        )}

        {/* ── Slide 1: Menu ── */}
        {current === 1 && (
          <View style={[styles.fill, { backgroundColor: colors.white }]}>
            <SafeAreaView style={styles.fill} edges={['top']}>
              {/* Top image panel */}
              <LinearGradient colors={['#FCE4EC', '#F8BBD9']} style={styles.s1Top}>
                <View style={styles.floatTag1}><Text style={styles.floatTagText}>✨ Fan Favorite</Text></View>
                <View style={styles.floatTag2}><Text style={styles.floatTagText}>🔥 New Arrival</Text></View>
                <View style={styles.menuCard}>
                  <Text style={styles.mcLabel}>TODAY'S PICKS</Text>
                  <Text style={styles.mcTitle}>Our Menu</Text>
                  {MENU_ITEMS.map(item => (
                    <View key={item.name} style={[styles.mcItem, item.active && styles.mcItemActive]}>
                      <Text style={styles.mcEmoji}>{item.emoji}</Text>
                      <Text style={[styles.mcName, item.active && styles.mcTextLight]}>{item.name}</Text>
                      <Text style={[styles.mcPrice, item.active && styles.mcTextLight]}>{item.price}</Text>
                    </View>
                  ))}
                </View>
              </LinearGradient>

              {/* Body text */}
              <ScrollView contentContainerStyle={styles.s1Body} showsVerticalScrollIndicator={false}>
                <View style={styles.badge}><Text style={styles.badgeText}>OUR MENU</Text></View>
                <Text style={styles.s1Title}>
                  Crafted with <Text style={styles.italic}>heart</Text> & bloom.
                </Text>
                <Text style={styles.s1Sub}>{SLIDES[1].sub}</Text>
              </ScrollView>
            </SafeAreaView>
          </View>
        )}

        {/* ── Slide 2: Rewards ── */}
        {current === 2 && (
          <View style={[styles.fill, { backgroundColor: colors.dark }]}>
            <SafeAreaView style={styles.fill} edges={['top']}>
              {/* Top section */}
              <LinearGradient colors={['#3D1A2B', colors.dark]} style={styles.s2Top}>
                <View style={styles.circleDeco1} />
                <View style={styles.circleDeco2} />
                <Text style={styles.s2Title}>
                  Join <Text style={{ color: colors.rose }}>Coffeecient{'\n'}</Text>Rewards ✦
                </Text>
                <Text style={styles.s2Sub}>{SLIDES[2].sub}</Text>
              </LinearGradient>

              {/* Perks */}
              <ScrollView contentContainerStyle={styles.perksContainer} showsVerticalScrollIndicator={false}>
                {PERKS.map((p, i) => (
                  <View key={p.title} style={styles.perkCard}>
                    <LinearGradient
                      colors={i === 0 ? ['#E8587A','#C23B66'] : i === 1 ? ['#F4A7B9','#E8587A'] : ['#FADADD','#F4A7B9']}
                      style={styles.perkIcon}
                    >
                      <Text style={styles.perkEmoji}>{p.emoji}</Text>
                    </LinearGradient>
                    <View style={styles.perkText}>
                      <Text style={styles.perkTitle}>{p.title}</Text>
                      <Text style={styles.perkDesc}>{p.desc}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </SafeAreaView>
          </View>
        )}

      </Animated.View>

      {/* ── Bottom Bar ── */}
      <View style={[styles.bottomBar, isDark && styles.bottomBarDark]}>
        {/* Skip */}
        {current < 2 && (
          <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.replace('Main')}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}

        {/* Dots */}
        <View style={styles.dots}>
          {[0, 1, 2].map(i => (
            <View key={i} style={[styles.dot, i === current && styles.dotActive]} />
          ))}
        </View>

        {/* CTA */}
        {isDark ? (
          <>
            <TouchableOpacity style={styles.btnWhite} onPress={handleCTA}>
              <Text style={styles.btnWhiteText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnGhost} onPress={() => navigation.replace('Login')}>
              <Text style={styles.btnGhostText}>Sign in instead</Text>
            </TouchableOpacity>
          </>
        ) : (
          <LinearGradient colors={['#E8587A', '#C23B66']} style={styles.btnPrimaryGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <TouchableOpacity style={styles.btnPrimaryInner} onPress={handleCTA}>
              <Text style={styles.btnPrimaryText}>Continue →</Text>
            </TouchableOpacity>
          </LinearGradient>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root:            { flex: 1 },
  fill:            { flex: 1 },
  slideContainer:  { flex: 1 },

  // Blobs
  blob: { position: 'absolute', borderRadius: 999, opacity: 0.45 },

  // Slide 0
  s0Content:  { alignItems: 'center', paddingHorizontal: 32, paddingTop: 60, paddingBottom: 16 },
  logoMark:   { width: 72, height: 72, backgroundColor: '#E8587A', borderRadius: 22, alignItems: 'center', justifyContent: 'center', ...shadow.md },
  logoEmoji:  { fontSize: 32 },
  brandName:  { fontFamily: fonts.dmSansMedium, fontSize: 12, letterSpacing: 3, color: colors.muted, marginTop: 12 },
  cupWrap:    { width: width * 0.7, height: width * 0.7, borderRadius: radius.lg, overflow: 'hidden', marginVertical: 32, ...shadow.lg },
  cupImage:   { width: '100%', height: '100%' },
  s0Title:    { fontFamily: fonts.playfair, fontSize: 38, lineHeight: 46, color: colors.text, textAlign: 'center' },
  italic:     { fontFamily: fonts.playfairItalic, color: '#E8587A' },
  s0Sub:      { fontFamily: fonts.dmSans, fontSize: 15, color: colors.muted, textAlign: 'center', lineHeight: 24, marginTop: 16 },

  // Slide 1
  s1Top:      { height: height * 0.42, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  floatTag1:  { position: 'absolute', top: 36, right: 24, backgroundColor: '#E8587A', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  floatTag2:  { position: 'absolute', bottom: 28, left: 20, backgroundColor: '#C23B66', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  floatTagText: { fontFamily: fonts.dmSansBold, fontSize: 11, color: '#fff' },
  menuCard:   { backgroundColor: '#fff', borderRadius: 20, padding: 18, width: width * 0.65, ...shadow.md },
  mcLabel:    { fontFamily: fonts.dmSansMedium, fontSize: 9, letterSpacing: 2, color: colors.muted, marginBottom: 4 },
  mcTitle:    { fontFamily: fonts.playfair, fontSize: 20, color: colors.text, marginBottom: 10 },
  mcItem:     { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.petal, borderRadius: 11, padding: 10, marginBottom: 7 },
  mcItemActive: { backgroundColor: undefined, backgroundImage: undefined },
  mcEmoji:    { fontSize: 16 },
  mcName:     { fontFamily: fonts.dmSansMedium, fontSize: 12, color: colors.text, flex: 1 },
  mcPrice:    { fontFamily: fonts.dmSansBold, fontSize: 12, color: colors.deepRose },
  mcTextLight:{ color: '#fff' },
  s1Body:     { paddingHorizontal: 28, paddingTop: 24, paddingBottom: 16 },
  badge:      { backgroundColor: '#FFE8EE', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, alignSelf: 'flex-start', marginBottom: 12 },
  badgeText:  { fontFamily: fonts.dmSansBold, fontSize: 10, letterSpacing: 1, color: '#E8587A' },
  s1Title:    { fontFamily: fonts.playfair, fontSize: 28, color: colors.text, lineHeight: 36 },
  s1Sub:      { fontFamily: fonts.dmSans, fontSize: 14, color: colors.muted, lineHeight: 22, marginTop: 10 },

  // Slide 2
  s2Top:      { paddingHorizontal: 32, paddingTop: 52, paddingBottom: 36, position: 'relative', overflow: 'hidden' },
  circleDeco1:{ position: 'absolute', width: 320, height: 320, borderRadius: 160, borderWidth: 1, borderColor: 'rgba(244,167,185,0.12)', top: -120, right: -100 },
  circleDeco2:{ position: 'absolute', width: 200, height: 200, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(244,167,185,0.1)', top: -60, right: -50 },
  s2Title:    { fontFamily: fonts.playfair, fontSize: 34, color: '#fff', lineHeight: 42, position: 'relative' },
  s2Sub:      { fontFamily: fonts.dmSans, fontSize: 14, color: '#C8899A', lineHeight: 22, marginTop: 12, position: 'relative' },
  perksContainer: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 16, gap: 12 },
  perkCard:   { flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(244,167,185,0.12)', borderRadius: 18, padding: 16 },
  perkIcon:   { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  perkEmoji:  { fontSize: 22 },
  perkText:   { flex: 1 },
  perkTitle:  { fontFamily: fonts.dmSansBold, fontSize: 14, color: '#fff' },
  perkDesc:   { fontFamily: fonts.dmSans, fontSize: 12, color: '#A07080', marginTop: 3 },

  // Bottom bar
  bottomBar:     { backgroundColor: '#fff', paddingHorizontal: 28, paddingTop: 16, paddingBottom: 36, borderTopWidth: 1, borderTopColor: 'rgba(194,86,107,0.08)' },
  bottomBarDark: { backgroundColor: colors.dark, borderTopColor: 'rgba(244,167,185,0.08)' },
  skipBtn:       { position: 'absolute', top: -48, right: 20, backgroundColor: 'rgba(255,255,255,0.75)', paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20 },
  skipText:      { fontFamily: fonts.dmSansMedium, fontSize: 13, color: colors.muted },
  dots:          { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 16 },
  dot:           { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(232,88,122,0.25)' },
  dotActive:     { width: 22, backgroundColor: '#E8587A' },
  btnPrimaryGrad: { borderRadius: 16, marginBottom: 0, ...shadow.md },
  btnPrimaryInner:{ paddingVertical: 17, alignItems: 'center', justifyContent: 'center' },
  btnPrimaryText: { fontFamily: fonts.dmSansBold, fontSize: 16, color: '#fff' },
  btnWhite:      { backgroundColor: '#fff', borderRadius: 16, paddingVertical: 17, alignItems: 'center', ...shadow.md },
  btnWhiteText:  { fontFamily: fonts.dmSansBold, fontSize: 16, color: colors.text },
  btnGhost:      { paddingVertical: 13, alignItems: 'center' },
  btnGhostText:  { fontFamily: fonts.dmSans, fontSize: 14, color: '#A07080' },
});
