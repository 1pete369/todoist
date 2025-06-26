// File: src/navigators/transitions.ts
import {
  TransitionSpecs,
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack'

export const horizontalTransition: StackNavigationOptions = {
  gestureEnabled:    true,
  gestureDirection:  'horizontal',
  transitionSpec: {
    open:  TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  cardStyle:            { backgroundColor: '#fff' },
}