import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Image,
  Modal, StyleSheet, Dimensions, Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PRODUCTS } from '../data/data';
import { colors, fonts, radius, shadow } from '../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48 - 12) / 2;

function ProductModal({ product, onClose }) {
  if (!product) return null;
  return (
    <Modal visible animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modal} onPress={e => e.stopPropagation()}>
          <View style={styles.modalImageWrap}>
            <Image source={{ uri: product.image }} style={styles.modalImage} />
            <LinearGradient colors={['transparent', 'rgba(59,31,39,0.4)']} style={StyleSheet.absoluteFill} />
            <TouchableOpacity style={styles.modalClose} onPress={onClose}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            <Text style={styles.modalName}>{product.name}</Text>
            <Text style={styles.modalDesc}>{product.longDesc}</Text>
            <View style={styles.tagsRow}>
              {product.tags.map(tag => (
                <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
              ))}
            </View>
            <View style={styles.tagsRow}>
              {product.calories && <View style={styles.tag}><Text style={styles.tagText}>🔥 {product.calories}</Text></View>}
              {product.origin   && <View style={styles.tag}><Text style={styles.tagText}>🌍 {product.origin}</Text></View>}
            </View>
            <View style={styles.modalFooter}>
              <Text style={styles.modalPrice}>{product.price}</Text>
              <TouchableOpacity onPress={onClose}>
                <LinearGradient colors={['#E8899A','#C2566B']} style={styles.modalBtn}>
                  <Text style={styles.modalBtnText}>Close</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function ProductsScreen({ navigation, user }) {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={[colors.blush, colors.softPink]} style={styles.header}>
          <SafeAreaView edges={['top']}>
            <Text style={styles.headerTitle}>Our Menu</Text>
            <Text style={styles.headerSub}>Crafted with care, served with love</Text>
          </SafeAreaView>
        </LinearGradient>

        {/* Member banner */}
        {!user && (
          <TouchableOpacity style={styles.banner} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.bannerText}>
              <Text style={styles.bannerLink}>Join as a member</Text> for exclusive deals & seasonal specials ☕
            </Text>
          </TouchableOpacity>
        )}

        {/* Grid */}
        <View style={styles.grid}>
          {PRODUCTS.map(product => (
            <TouchableOpacity key={product.id} style={styles.card} onPress={() => setSelected(product)} activeOpacity={0.9}>
              <View style={styles.cardImageWrap}>
                <Image source={{ uri: product.image }} style={styles.cardImage} />
                {product.badge && (
                  <View style={styles.badge}><Text style={styles.badgeText}>{product.badge}</Text></View>
                )}
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardName} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>{product.desc}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardPrice}>{product.price}</Text>
                  <TouchableOpacity style={styles.detailBtn} onPress={() => setSelected(product)}>
                    <Text style={styles.detailBtnText}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with <Text style={styles.footerAccent}>♥ & ☕</Text> by Coffeecient © {new Date().getFullYear()}</Text>
        </View>
      </ScrollView>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root:          { flex: 1, backgroundColor: colors.petal },
  header:        { paddingHorizontal: 24, paddingBottom: 32, paddingTop: 16 },
  headerTitle:   { fontFamily: fonts.playfair, fontSize: 36, color: colors.text },
  headerSub:     { fontFamily: fonts.dmSans, fontSize: 14, color: colors.muted, marginTop: 6 },

  banner:        { backgroundColor: 'rgba(232,137,154,0.1)', borderBottomWidth: 1, borderBottomColor: 'rgba(194,86,107,0.15)', padding: 14, paddingHorizontal: 20 },
  bannerText:    { fontFamily: fonts.dmSans, fontSize: 13, color: colors.muted, textAlign: 'center' },
  bannerLink:    { fontFamily: fonts.dmSansBold, color: colors.deepRose },

  grid:          { flexDirection: 'row', flexWrap: 'wrap', gap: 12, padding: 24 },
  card:          { width: CARD_WIDTH, backgroundColor: colors.white, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(194,86,107,0.1)', ...shadow.sm },
  cardImageWrap: { height: 140, position: 'relative' },
  cardImage:     { width: '100%', height: '100%' },
  badge:         { position: 'absolute', top: 8, right: 8, backgroundColor: colors.deepRose, paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.full },
  badgeText:     { fontFamily: fonts.dmSansBold, fontSize: 9, color: '#fff', textTransform: 'uppercase', letterSpacing: 0.5 },
  cardBody:      { padding: 14 },
  cardName:      { fontFamily: fonts.playfair, fontSize: 14, color: colors.text, marginBottom: 4 },
  cardDesc:      { fontFamily: fonts.dmSans, fontSize: 11, color: colors.muted, lineHeight: 16, marginBottom: 10 },
  cardFooter:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardPrice:     { fontFamily: fonts.playfair, fontSize: 16, color: colors.deepRose },
  detailBtn:     { backgroundColor: colors.text, paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.full },
  detailBtnText: { fontFamily: fonts.dmSansBold, fontSize: 10, color: '#fff' },

  // Modal
  modalOverlay:  { flex: 1, backgroundColor: 'rgba(59,31,39,0.6)', justifyContent: 'flex-end' },
  modal:         { backgroundColor: colors.white, borderTopLeftRadius: 28, borderTopRightRadius: 28, maxHeight: '90%' },
  modalImageWrap:{ height: 220, position: 'relative' },
  modalImage:    { width: '100%', height: '100%', borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  modalClose:    { position: 'absolute', top: 14, right: 14, backgroundColor: 'rgba(255,255,255,0.25)', width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  modalCloseText:{ color: '#fff', fontSize: 14, fontFamily: fonts.dmSansBold },
  modalBody:     { padding: 28 },
  modalName:     { fontFamily: fonts.playfair, fontSize: 24, color: colors.text, marginBottom: 8 },
  modalDesc:     { fontFamily: fonts.dmSans, fontSize: 14, color: colors.muted, lineHeight: 22, marginBottom: 16 },
  tagsRow:       { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  tag:           { backgroundColor: colors.softPink, borderWidth: 1, borderColor: 'rgba(194,86,107,0.2)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: radius.full },
  tagText:       { fontFamily: fonts.dmSansMedium, fontSize: 12, color: colors.deepRose },
  modalFooter:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, paddingBottom: 8 },
  modalPrice:    { fontFamily: fonts.playfair, fontSize: 28, color: colors.deepRose },
  modalBtn:      { paddingHorizontal: 24, paddingVertical: 12, borderRadius: radius.full },
  modalBtnText:  { fontFamily: fonts.dmSansBold, fontSize: 15, color: '#fff' },

  footer:        { backgroundColor: colors.blush, padding: 24, alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(194,86,107,0.15)', marginTop: 8 },
  footerText:    { fontFamily: fonts.dmSans, fontSize: 13, color: colors.muted },
  footerAccent:  { color: colors.deepRose },
});
