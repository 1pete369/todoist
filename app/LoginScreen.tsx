// File: src/screens/LoginScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  View,
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useUserContext } from '@/context/useAuthContext';
import ScreenLayout from '@/components/layouts/ScreenLayout';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoggingIn } = useUserContext();
  const shift = useSharedValue(0);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mainError, setMainError] = useState('');

  const handleEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError('Please enter a valid email.');
    } else {
      setEmailError('');
    }
  };

  const handlePassword = (text: string) => {
    if (text.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    if (email === '' || password === '') {
      setMainError('Fill all the fields!');
      return;
    }

    if (emailError || passwordError) {
      return;
    }

    try {
      const success = await login({ email, password });
      if (success) {
        router.replace('/(authenticated)/(tabs)/today');
      }
    } catch (err: any) {
      console.log('Error at handle login', err.response?.data?.message);
      setMainError(err.response?.data?.message || 'Login failed.');
    }
  };

  // Animated style for shifting the form
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: shift.value }],
  }));

  useEffect(() => {
    // When keyboard opens, slide up
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      shift.value = withTiming(-100, { duration: 300 });
    });
    // When keyboard closes, slide back down
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      shift.value = withTiming(0, { duration: 300 });
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [shift]);

  return (
    <ScreenLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center bg-white px-6">
        <Animated.View style={animatedStyle}>
          <Text className="mb-6 text-3xl font-bold text-brand-500">Login</Text>
          
          {mainError ? <Text className="mb-4 text-center text-red-600">{mainError}</Text> : null}

          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              handleEmail(text);
            }}
            className={`mb-4 rounded border px-4 py-4 placeholder:text-gray-600 ${
              emailError ? 'border-red-500' : 'border-brand-300'
            }`}
          />
          {emailError ? <Text className="mb-4 text-red-600">{emailError}</Text> : null}

          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              handlePassword(text);
            }}
            className={`mb-6 rounded border px-4 py-4 placeholder:text-gray-600 ${
              passwordError ? 'border-red-500' : 'border-brand-300'
            }`}
          />
          {passwordError ? <Text className="mb-4 text-red-600">{passwordError}</Text> : null}

          <TouchableOpacity
            activeOpacity={0.8}
            className="mb-4 rounded bg-brand-500 py-3"
            onPress={handleLogin}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <View className="flex-row items-center justify-center">
                <ActivityIndicator color="white" className="mr-2" />
                <Text className="text-white font-semibold">Logging in...</Text>
              </View>
            ) : (
              <Text className="text-center text-lg font-semibold text-white">Log In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.back()}>
            <Text className="text-center text-gray-600">
              Don&apos;t have an account?{' '}
              <Text className="font-semibold text-brand-500">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
