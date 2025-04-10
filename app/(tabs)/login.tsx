import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Theme } from './theme';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 

export default function LoginScreen() {
  const router = useRouter(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  const handleLogin = async () => {
    if (email === '' || password === '') {
      alert('Please fill in both fields');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      alert('Login failed: ' + error);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyHealth</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          placeholderTextColor={Theme.colors.white}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="**********"
          placeholderTextColor={Theme.colors.white}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Log in</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/signUp')}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.dark,
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.xl * 3,
  },
  title: {
    fontSize: Theme.sizes.title,
    fontFamily: Theme.fonts.bold,
    color: Theme.colors.primary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  inputGroup: {
    marginBottom: Theme.spacing.sm,
  },
  label: {
    fontSize: Theme.sizes.body,
    fontFamily: Theme.fonts.medium,
    color: Theme.colors.white,
    marginBottom: Theme.spacing.xs,
  },
  input: {
    height: Theme.heights.input,
    borderWidth: 1,
    borderColor: Theme.colors.white,
    borderRadius: Theme.radii.lg,
    paddingHorizontal: Theme.spacing.md,
    fontFamily: Theme.fonts.medium,
    fontSize: Theme.sizes.body,
    color: Theme.colors.white,
    
  },
  primaryButton: {
    height: Theme.heights.button,
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.radii.lgx,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Theme.spacing.md,
  },
  secondaryButton: {
    marginTop: Theme.spacing.lg,
    alignItems: 'center',
    color: Theme.colors.white
  },
  buttonText: {
    fontFamily: Theme.fonts.bold,
    fontSize: Theme.sizes.small,
    color: Theme.colors.white,
  },
});