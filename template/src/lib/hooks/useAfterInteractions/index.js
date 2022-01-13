import {useState, useEffect, useRef} from 'react';
import {InteractionManager} from 'react-native';
import {TransitioningView} from 'react-native-reanimated';

const useAfterInteractions = () => {
  const [areInteractionsComplete, setInteractionsComplete] = useState(false);

  const subscriptionRef = useRef(null);

  const transitionRef = useRef(null);

  useEffect(() => {
    subscriptionRef.current = InteractionManager.runAfterInteractions(() => {
      transitionRef.current?.animateNextTransition();
      setInteractionsComplete(true);
      subscriptionRef.current = null;
    });
    return () => {
      subscriptionRef.current?.cancel();
    };
  }, []);

  return {
    areInteractionsComplete,
    transitionRef,
  };
};

export default useAfterInteractions;
