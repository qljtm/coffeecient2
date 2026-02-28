import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TEAM, STATS } from '../data/data';
import { colors, fonts, radius, shadow } from '../theme';

const { width } = Dimensions.get('window');

export default function AboutScreen() {
  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <SafeAreaView edges={['top']}>
        {/* Hero image */}
        <View style={styles.heroImageWrap}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
        </View>

        {/* Story */}
        <View style={styles.storySection}>
          <Text style={styles.storyHeading}>
            A Passion Brewed <Text style={styles.italic}>Over Decades</Text>
          </Text>
          <Text style={styles.storyText}>
            Coffeecient began in 2001 as a tiny kiosk on a rainy Portland corner — a single espresso machine, two bar stools, and an obsession with perfect coffee.
          </Text>
          <Text style={styles.storyText}>
            Today we're a beloved gathering place, but our philosophy hasn't changed: treat every cup like a handwritten letter to the person who'll drink it.
          </Text>
          <Text style={styles.storyText}>
            We believe coffee is more than caffeine — it's connection, ritual, and a tiny daily luxury that belongs to everyone.
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {STATS.map(({ number, label }) => (
            <View key={label} style={styles.statCard}>
              <Text style={styles.statNumber}>{number}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Team */}
        <View style={styles.teamSection}>
          <Text style={styles.sectionTitle}>Meet Our Crew</Text>
          <Text style={styles.sectionSub}>The humans behind your perfect cup</Text>
          <View style={styles.teamGrid}>
            {TEAM.map(({ image, name, role }) => (
              <View key={name} style={styles.teamCard}>
                <Image source={{ uri: image }} style={styles.teamAvatar} />
                <Text style={styles.teamName}>{name}</Text>
                <Text style={styles.teamRole}>{role}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with <Text style={styles.footerAccent}>♥ & ☕</Text> by Coffeecient © {new Date().getFullYear()}</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const STAT_WIDTH = (width - 48 - 12 * 3) / 4;
const TEAM_WIDTH = (width - 48 - 12) / 2;

const styles = StyleSheet.create({
  root:           { flex: 1, backgroundColor: colors.softPink },
  heroImageWrap:  { height: 280, position: 'relative' },
  heroImage:      { width: '100%', height: '100%' },
  heroOverlay:    { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(194,86,107,0.2)' },

  storySection:  { backgroundColor: colors.white, padding: 28 },
  storyHeading:  { fontFamily: fonts.playfair, fontSize: 28, color: colors.text, lineHeight: 36, marginBottom: 16 },
  italic:        { fontFamily: fonts.playfairItalic, color: colors.deepRose },
  storyText:     { fontFamily: fonts.dmSans, fontSize: 14, color: colors.muted, lineHeight: 22, marginBottom: 12 },

  statsRow:      { flexDirection: 'row', flexWrap: 'wrap', gap: 12, padding: 24, backgroundColor: colors.softPink },
  statCard:      { width: STAT_WIDTH, backgroundColor: colors.white, borderRadius: radius.md, padding: 16, alignItems: 'center', ...shadow.sm },
  statNumber:    { fontFamily: fonts.playfair, fontSize: 28, color: colors.deepRose, lineHeight: 32 },
  statLabel:     { fontFamily: fonts.dmSans, fontSize: 10, color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 4, textAlign: 'center' },

  teamSection:   { backgroundColor: colors.white, padding: 24 },
  sectionTitle:  { fontFamily: fonts.playfair, fontSize: 26, color: colors.text, textAlign: 'center' },
  sectionSub:    { fontFamily: fonts.dmSans, fontSize: 13, color: colors.muted, textAlign: 'center', marginTop: 6, marginBottom: 20 },
  teamGrid:      { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  teamCard:      { width: TEAM_WIDTH, backgroundColor: colors.petal, borderRadius: radius.md, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(194,86,107,0.1)', ...shadow.sm },
  teamAvatar:    { width: 72, height: 72, borderRadius: 36, marginBottom: 12, borderWidth: 3, borderColor: colors.blush },
  teamName:      { fontFamily: fonts.playfair, fontSize: 14, color: colors.text, textAlign: 'center', marginBottom: 4 },
  teamRole:      { fontFamily: fonts.dmSans, fontSize: 11, color: colors.muted, textAlign: 'center' },

  footer:        { backgroundColor: colors.blush, padding: 24, alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(194,86,107,0.15)' },
  footerText:    { fontFamily: fonts.dmSans, fontSize: 13, color: colors.muted },
  footerAccent:  { color: colors.deepRose },
});
