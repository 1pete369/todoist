import { Text, View, Pressable, Animated } from 'react-native';
import React, { useRef } from 'react';

export default function AnimatedNavButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const translateY = useRef(new Animated.Value(0)).current;

  const pressIn = () => {
    Animated.spring(translateY, {
      toValue: 6,
      useNativeDriver: true,
      bounciness: 6,
      // speed:20
    }).start();
  };

  const pressOut = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 6,
      // speed:20
    }).start();
  };

  return (
    <View className="relative mb-10 items-center">
      <View className="bg-brand-600 absolute top-[6px] z-0 h-[50px]  w-full rounded-lg" />
      <Animated.View
        className="z-10 w-full"
        style={{
          transform: [{ translateY }],
        }}>
        <Pressable
          onPressIn={pressIn}
          onPressOut={pressOut}
          onPress={onPress}
          disabled={disabled}
          className="bg-brand-500 h-[50px] w-full items-center justify-center rounded-lg shadow-2xl">
          <Text className="text-lg font-bold tracking-wide text-white">{label.toUpperCase()}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
