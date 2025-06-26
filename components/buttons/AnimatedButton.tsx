import React, { useRef } from 'react';
import { Animated, Pressable, Text, ViewStyle } from 'react-native';

type AnimatedButtonProps = {
  label: string;
  onPress: () => void;
  type: 'primary' | 'secondary';
  selected?: boolean;
};

export default function AnimatedButton({
  label,
  onPress,
  selected = false,
  type,
}: AnimatedButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateIn = () =>
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  const animateOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 4 }).start();

  const bgClass =
    type === 'primary'
      ? selected
        ? 'bg-brand-50 border-brand-500'
        : 'border-gray-500'
      : selected
        ? 'bg-green-100 border-green-500'
        : 'border-gray-500';

  const textClass =
    type === 'primary'
      ? selected
        ? 'text-brand-700'
        : 'text-gray-800'
      : selected
        ? 'text-green-700'
        : 'text-gray-800';
  return (
    <Animated.View style={{ transform: [{ scale }] } as ViewStyle}>
      <Pressable
        onPressIn={animateIn}
        onPressOut={animateOut}
        onPress={onPress}
        className={`mt-3 rounded-lg border-2 px-4 py-5 ${bgClass}`}>
        <Text className={`text-lg font-semibold ${textClass}`}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}
