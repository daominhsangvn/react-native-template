import React, {useEffect, useState} from 'react';
// import {Transition, Transitioning} from 'react-native-reanimated';
// import useAfterInteractions from '@lib/hooks/useAfterInteractions';
import {useFocusEffect} from '@react-navigation/native';
import {View} from 'react-native';
import useAfterInteractions from '@lib/hooks/useAfterInteractions';

const DelayRender = ({style, children, placeHolder: Placeholder}) => {
  const [isReady, setIsReady] = useState(false);
  const {areInteractionsComplete} = useAfterInteractions();

  useFocusEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    });
  });

  return (
    <View style={style}>
      {isReady && areInteractionsComplete ? (
        children
      ) : Placeholder ? (
        <Placeholder />
      ) : null}
    </View>
  );
};

// const DelayRender = ({
//   transition = (
//     <Transition.Together>
//       <Transition.Change interpolation="easeInOut" />
//       <Transition.In type="fade" />
//     </Transition.Together>
//   ),
//   style,
//   children,
//   placeHolder: Placeholder,
// }) => {
//   const navigation = useNavigation();
//   const [isReady, setIsReady] = useState(false);
//
//   useEffect(() => {
//     const unsubscribeFocus = navigation.addListener('focus', () => {
//       console.log('focus');
//       setTimeout(() => {
//         setIsReady(true);
//       });
//       // if (!isReady) {
//       //   setIsReady(true);
//       // }
//     });
//
//     return () => {
//       unsubscribeFocus();
//     };
//   }, []);
//
//   const {transitionRef, areInteractionsComplete} = useAfterInteractions();
//   return (
//     <Transitioning.View
//       transition={transition}
//       style={style}
//       ref={transitionRef}>
//       {areInteractionsComplete && isReady ? (
//         children
//       ) : Placeholder ? (
//         <Placeholder />
//       ) : null}
//     </Transitioning.View>
//   );
// };

export default DelayRender;
