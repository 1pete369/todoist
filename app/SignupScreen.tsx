// File: src/screens/SignupScreen.tsx
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
import ScreenLayout from '@/components/layouts/ScreenLayout';
import { useUserContext } from '@/context/useAuthContext';
import { axiosInstance } from '@/lib/axiosInstance';

export default function SignupScreen() {
  const router = useRouter();
  const shift = useSharedValue(0);

  const { signup } = useUserContext();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [fullNameError, setFullNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mainError, setMainError] = useState('');
  const [canSignup, setCanSignup] = useState(false);

  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const handleName = (text: string) => {
    if (text.trim().length < 3) {
      setFullNameError('Full name must be at least 3 characters.');
    } else {
      setFullNameError('');
    }
  };

  const handleUsername = (text: string) => {
    const regex = /^[a-z0-9_]+$/;
    if (text.trim().length < 3) {
      setUsernameError('Username must be at least 3 characters.');
    } else if (!regex.test(text)) {
      setUsernameError('Only lowercase letters, numbers, and underscores allowed.');
    } else {
      setUsernameError('');
    }
  };

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

  const handleSignup = async () => {
    console.log('came');
    if (fullName === '' || username === '' || email === '' || password === '') {
      setMainError('Fill all the fields!');
      return;
    }

    console.log('cansignup', canSignup);

    if (!canSignup) return;

    try {
      const data = { fullName, username, email, password };
      console.log('Data', data);
      const success = await signup(data);
      if (success) {
        router.replace('/(authenticated)');
      }
      console.log('Success', success);
    } catch (err: any) {
      console.log('Error at handle signup', err.response?.data?.message);
      // setErrorMessage(err.response?.data?.message || 'Signup failed.');
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      const validFormat = /^[a-z0-9_]+$/.test(username);
      if (username.trim().length >= 3 && validFormat) {
        setCheckingUsername(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
          const res = await axiosInstance.get(`/auth/check-username?username=${username}`);
          setIsUsernameAvailable(res.data.available);

          if (!res.data.available) {
            setUsernameError('Username is already taken.');
          } else {
            setUsernameError('');
          }
        } catch {
          setUsernameError("Couldn't check username.");
        } finally {
          setCheckingUsername(false);
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [username]);

  useEffect(() => {
    if (
      username !== '' &&
      usernameError === '' &&
      email !== '' &&
      emailError === '' &&
      password !== '' &&
      passwordError === ''
    ) {
      setCanSignup(true);
      setMainError('')
    } else {
      setCanSignup(false);
    }
  }, [
    username,
    fullName,
    email,
    password,
    usernameError,
    fullNameError,
    emailError,
    passwordError,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: shift.value }],
  }));

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      shift.value = withTiming(-100, { duration: 300 });
    });
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
          <Text className="mb-6 text-3xl font-bold text-brand-500">Sign Up</Text>
          {mainError ? <Text className="mb-4 text-center text-red-600">{mainError}</Text> : null}
          <TextInput
            className={`mb-4 rounded border px-4 py-4 placeholder:text-gray-600 ${
              fullNameError ? 'border-red-500' : 'border-brand-300'
            }`}
            placeholder="Full Name"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              handleName(text);
            }}
          />
          {fullNameError ? <Text className="mb-4 text-red-600">{fullNameError}</Text> : null}

          {/* Username */}
          <TextInput
            className={`mb-4 rounded border px-4 py-4 placeholder:text-gray-600 ${
              usernameError ? 'border-red-500' : 'border-brand-300'
            }`}
            placeholder="Username"
            autoCapitalize="none"
            value={username}
            onChangeText={(text) => {
              const formatted = text.toLowerCase();
              setUsername(formatted);
              handleUsername(formatted);
            }}
          />

          {/* Spinner + Username Check */}
          {(checkingUsername || usernameError || (isUsernameAvailable && username.length >= 3)) && (
            <View className="mb-4">
              {checkingUsername ? (
                <View className="flex flex-row items-center gap-2">
                  <Text>checking availability</Text>
                  <ActivityIndicator color="#4B5563" />
                </View>
              ) : usernameError ? (
                <Text className="text-red-600">{usernameError}</Text>
              ) : (
                <Text className="text-green-600">username is available</Text>
              )}
            </View>
          )}

          {/* Email */}
          <TextInput
            className={`mb-4 rounded border px-4 py-4 placeholder:text-gray-600 ${
              emailError ? 'border-red-500' : 'border-brand-300'
            }`}
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              handleEmail(text);
            }}
          />
          {emailError ? <Text className="mb-4 text-red-600">{emailError}</Text> : null}

          {/* Password */}
          <TextInput
            className={`mb-4 rounded border px-4 py-4 text-black ${
              passwordError ? 'border-red-500' : 'border-brand-300'
            }`}
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true}
            placeholderTextColor={'#4b5563'}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              handlePassword(text);
            }}
          />
          {passwordError ? <Text className="mb-4 text-red-600">{passwordError}</Text> : null}
          <TouchableOpacity
            className="mb-4 rounded bg-brand-500 py-3"
            activeOpacity={0.8} // ← less aggressive fade (1.0 = no fade, 0.85 = mild)
            onPress={handleSignup}>
            <Text className="text-center text-lg font-semibold text-white">Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8} // ← less aggressive fade (1.0 = no fade, 0.85 = mild)
            onPress={() => router.push('/LoginScreen')}>
            <Text className="text-center text-gray-600">
              Already have an account? <Text className="font-semibold text-brand-500">Log In</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}
