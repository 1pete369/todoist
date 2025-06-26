// File: src/components/ScreenLayout.tsx
import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ScreenLayoutProps = {
  children: React.ReactNode;
  /** Center children both vertically & horizontally */
  center?: boolean;
  /** Extra Tailwind classes for the container */
  className?: string;
  /** Which safe-area edges to apply padding for */
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  /** Any additional style overrides */
  style?: StyleProp<ViewStyle>;
};

export default function ScreenLayout({
  children,
  center = false,
  className = '',
  edges = ['top', 'bottom', 'left', 'right'],
  style,
}: ScreenLayoutProps) {
  const insets = useSafeAreaInsets();

  // Build a style object only for the edges you want
  const insetStyle: ViewStyle = {
    paddingTop:    edges.includes('top')    ? insets.top    : 0,
    paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
    paddingLeft:   edges.includes('left')   ? insets.left   : 0,
    paddingRight:  edges.includes('right')  ? insets.right  : 0,
  };

  return (
    <View
      // flex-1 so it fills the screen, plus any extra classes
      className={`flex-1 ${center ? 'items-center justify-center' : ''} ${className}`}
      style={[insetStyle, style]}
    >
      {children}
    </View>
  );
}
