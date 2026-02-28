import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userStore } from '../data/data';
import { colors, fonts, radius, shadow } from '../theme';

const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export default function AuthScreen({ route, navigation, setUser }) {
  const mode = route?.params?.mode ?? 'login';
  const isLogin = mode === 'login';

  const [fields, setFields]  = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors]  = useState({});
  const [globalErr, setGlobalErr] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const set = (key) => (val) => setFields(prev => ({ ...prev, [key]: val }));

  const validate = () => {
    const e = {};
    if (!isLogin && !fields.name.trim())               e.name     = 'Name is required';
    if (!isValidEmail(fields.email))                   e.email    = 'Enter a valid email';
    if (fields.password.length < 6)                    e.password = 'Min 6 characters';
    if (!isLogin && fields.password !== fields.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = () => {
    const v = validate();
    setErrors(v);
    setGlobalErr('');
    if (Object.keys(v).length > 0) return;

    if (isLogin) {
      const user = userStore.authenticate(fields.email, fields.password);
      if (!user) { setGlobalErr('Incorrect email or password.'); return; }
      setUser(user);
      navigation.replace('Main');
    } else {
      if (userStore.find(fields.email)) { setGlobalErr('Account already exists.'); return; }
      const newUser = { name: fields.name, email: fields.email, password: fields.password };
      userStore.add(newUser);
      setSuccessMsg('Account created! Signing you in…');
      setTimeout(() => { setUser(newUser); navigation.replace('Main'); }, 1200);
    }
  };

  return (
    <LinearGradient colors={[colors.blush, colors.softPink, colors.petal]} style={styles.root}>
      <SafeAreaView style={styles.root}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.root}>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <View style={styles.card}>
              <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Join Coffeecient'}</Text>
              <Text style={styles.sub}>{isLogin ? 'Sign in to your coffee corner' : 'Create your account — it\'s free'}</Text>

              {globalErr  ? <View style={styles.alertError}><Text style={styles.alertErrorText}>{globalErr}</Text></View> : null}
              {successMsg ? <View style={styles.alertSuccess}><Text style={styles.alertSuccessText}>{successMsg}</Text></View> : null}

              {!isLogin && (
                <FormField label="Full Name" placeholder="Your name" value={fields.name} onChangeText={set('name')} error={errors.name} />
              )}
              <FormField label="Email" placeholder="your@email.com" value={fields.email} onChangeText={set('email')} keyboardType="email-address" error={errors.email} />
              <FormField label="Password" placeholder="••••••••" value={fields.password} onChangeText={set('password')} secureTextEntry error={errors.password} />
              {!isLogin && (
                <FormField label="Confirm Password" placeholder="••••••••" value={fields.confirm} onChangeText={set('confirm')} secureTextEntry error={errors.confirm} />
              )}

              <TouchableOpacity onPress={handleSubmit} style={styles.submitWrap}>
                <LinearGradient colors={['#E8899A', '#C2566B']} style={styles.submit} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                  <Text style={styles.submitText}>{isLogin ? 'Sign In' : 'Create Account'}</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.switchRow}>
                <Text style={styles.switchText}>
                  {isLogin ? "Don't have an account? " : 'Already a member? '}
                </Text>
                <TouchableOpacity onPress={() => navigation.replace('Auth', { mode: isLogin ? 'register' : 'login' })}>
                  <Text style={styles.switchLink}>{isLogin ? 'Join Coffeecient' : 'Sign in'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function FormField({ label, error, ...props }) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label.toUpperCase()}</Text>
      <TextInput style={[styles.fieldInput, error && styles.fieldInputError]} autoCapitalize="none" autoCorrect={false} {...props} />
      {error ? <Text style={styles.fieldError}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root:            { flex: 1 },
  content:         { flexGrow: 1, justifyContent: 'center', padding: 24 },
  card:            { backgroundColor: colors.white, borderRadius: radius.lg, padding: 32, borderWidth: 1, borderColor: 'rgba(194,86,107,0.2)', ...shadow.md },
  title:           { fontFamily: fonts.playfair, fontSize: 28, color: colors.text, textAlign: 'center', marginBottom: 6 },
  sub:             { fontFamily: fonts.dmSans, fontSize: 14, color: colors.muted, textAlign: 'center', marginBottom: 28 },
  alertError:      { backgroundColor: 'rgba(192,57,43,0.08)', borderWidth: 1, borderColor: 'rgba(192,57,43,0.25)', borderRadius: 10, padding: 12, marginBottom: 16 },
  alertErrorText:  { fontFamily: fonts.dmSans, fontSize: 13, color: '#c0392b', textAlign: 'center' },
  alertSuccess:    { backgroundColor: 'rgba(39,174,96,0.08)', borderWidth: 1, borderColor: 'rgba(39,174,96,0.25)', borderRadius: 10, padding: 12, marginBottom: 16 },
  alertSuccessText:{ fontFamily: fonts.dmSans, fontSize: 13, color: '#27ae60', textAlign: 'center' },
  fieldWrap:       { marginBottom: 18 },
  fieldLabel:      { fontFamily: fonts.dmSansBold, fontSize: 11, color: colors.muted, letterSpacing: 0.8, marginBottom: 8 },
  fieldInput:      { backgroundColor: colors.petal, borderWidth: 1, borderColor: 'rgba(194,86,107,0.25)', borderRadius: 10, padding: 13, fontSize: 15, fontFamily: fonts.dmSans, color: colors.text },
  fieldInputError: { borderColor: '#c0392b' },
  fieldError:      { fontFamily: fonts.dmSans, fontSize: 12, color: '#c0392b', marginTop: 5 },
  submitWrap:      { borderRadius: radius.full, overflow: 'hidden', marginTop: 8, ...shadow.md },
  submit:          { paddingVertical: 16, alignItems: 'center' },
  submitText:      { fontFamily: fonts.dmSansBold, fontSize: 16, color: '#fff' },
  switchRow:       { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 },
  switchText:      { fontFamily: fonts.dmSans, fontSize: 14, color: colors.muted },
  switchLink:      { fontFamily: fonts.dmSansBold, fontSize: 14, color: colors.deepRose },
});
