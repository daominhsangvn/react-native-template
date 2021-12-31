import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {BOTTOM_TAB_HEIGHT} from '@configs/themes/var';
import Logger from "@lib/utils/Logger";

const {width, height} = Dimensions.get('window');

const BUTTON_SIZE = 80;
const BORDER = 10;
const ACTION_BUTTON_SIZE = 50;
const ACTION_BUTTON_ICON_SIZE = 24;
const ACTIONS = {
  NONE: 0,
  CAMERA: 1,
  VIDEO: 2,
  STATUS: 3,
};

const AddButton = ({theme, navigation}) => {
  const {styles, COLORS} = theme;
  const btnRef = useRef(null);

  const active = useSharedValue(false);
  const isPinch = useSharedValue(false);
  const cursorX = useSharedValue(0);
  const cursorY = useSharedValue(0);
  const activeAction = useSharedValue(ACTIONS.NONE);
  const buttonPosition = useSharedValue([0, 0]);
  const overlayXPos = useSharedValue(0);
  const overlayYPos = useSharedValue(0);

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(active.value ? 1 : 0),
      transform: [
        {
          translateX: active.value
            ? overlayXPos.value
            : withDelay(300, withTiming(-1000)),
        },
        {
          translateY: active.value
            ? overlayYPos.value
            : withDelay(300, withTiming(-1000)),
        },
      ],
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: active.value
            ? withTiming(1.2, {
                duration: 100,
              })
            : withSpring(1),
        },
        {
          rotate: active.value
            ? withTiming('45deg', {
                duration: 100,
              })
            : withSpring('0deg'),
        },
      ],
    };
  });

  const cameraProps = {
    x: -70,
    y: -55,
  };
  const cameraStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withSpring(active.value ? cameraProps.x : 0)},
        {translateY: withSpring(active.value ? cameraProps.y : 0)},
      ],
      opacity: withTiming(active.value ? 1 : 0, {duration: 200}),
      backgroundColor:
        activeAction.value === ACTIONS.CAMERA ? COLORS.primary : 'transparent',
    };
  });

  const videoCameraProps = {
    x: 0,
    y: -90,
  };
  const videoCameraStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: withSpring(active.value ? videoCameraProps.y : 0)},
      ],
      backgroundColor:
        activeAction.value === ACTIONS.VIDEO ? COLORS.primary : 'transparent',
      opacity: withTiming(active.value ? 1 : 0, {duration: 200}),
    };
  });

  const writeStatusProps = {
    x: 70,
    y: -55,
  };
  const writeStatusStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withSpring(active.value ? writeStatusProps.x : 0)},
        {translateY: withSpring(active.value ? writeStatusProps.y : 0)},
      ],
      backgroundColor:
        activeAction.value === ACTIONS.STATUS ? COLORS.primary : 'transparent',
      opacity: withTiming(active.value ? 1 : 0, {duration: 200}),
    };
  });

  const handleAction = action => {
    Logger.log('handleAction', action);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      active.value = true;
    },
    onEnd: (event, ctx) => {
      active.value = false;
      isPinch.value = false;

      if (activeAction.value !== ACTIONS.NONE) {
        runOnJS(handleAction)(activeAction.value);
      }

      activeAction.value = ACTIONS.NONE;
    },
    onCancel: (event, ctx) => {
      active.value = false;
      isPinch.value = false;
    },
    onFail: (event, ctx) => {
      active.value = false;
      isPinch.value = false;
    },
    onFinish: (event, ctx) => {
      active.value = false;
      isPinch.value = false;
    },
    onActive: (event, ctx) => {
      isPinch.value = true;
      cursorX.value = event.absoluteX;
      cursorY.value = event.absoluteY;
      // console.log('event', event);
      // console.log('event', [event.absoluteX, event.absoluteY]);
      // console.log(event.translationX, event.translationY);

      function isOver({x, y}) {
        const isOverY =
          cursorY.value <
            buttonPosition.value[1] + y + ACTION_BUTTON_SIZE / 2 &&
          cursorY.value > buttonPosition.value[1] + y - ACTION_BUTTON_SIZE / 2;

        const isOverX =
          cursorX.value >
            buttonPosition.value[0] + x - ACTION_BUTTON_SIZE / 2 &&
          cursorX.value < buttonPosition.value[0] + x + ACTION_BUTTON_SIZE / 2;

        return isOverY && isOverX;
      }

      if (isOver(cameraProps)) {
        activeAction.value = ACTIONS.CAMERA;
      } else if (isOver(videoCameraProps)) {
        activeAction.value = ACTIONS.VIDEO;
      } else if (isOver(writeStatusProps)) {
        activeAction.value = ACTIONS.STATUS;
      } else {
        activeAction.value = ACTIONS.NONE;
      }
    },
  });

  useEffect(() => {
    // Wait 500ms for the View initiated
    setTimeout(() => {
      btnRef.current.measureInWindow((x, y, w, h) => {
        Logger.log('btnRef.current.measureInWindow()', x, y);
        overlayXPos.value = x * -1;
        overlayYPos.value = y * -1 - BORDER;
        buttonPosition.value = [x + w / 2 - 1, y + h / 2 + 25];
      });
    }, 500);
  }, []);

  return (
    <PanGestureHandler
      maxPointers={1}
      onGestureEvent={gestureHandler}
      // onHandlerStateChange={({nativeEvent}) =>
      //   console.log('State', nativeEvent.state, State)
      // }
    >
      <Animated.View style={styles.container}>
        <Animated.View style={[styles.dim, overlayStyle]} />
        <Animated.View ref={btnRef} style={[styles.buttonContainer]}>
          {/*<Animated.View*/}
          {/*  style={{*/}
          {/*    position: 'absolute',*/}
          {/*    backgroundColor: '#ffffff',*/}
          {/*    zIndex: 5,*/}
          {/*    width: BUTTON_SIZE,*/}
          {/*    height: BUTTON_SIZE - BORDER,*/}
          {/*    top: 10,*/}
          {/*  }}*/}
          {/*/>*/}

          <Animated.View style={[styles.actionButton, cameraStyle]}>
            <Icon
              name="camera"
              size={ACTION_BUTTON_ICON_SIZE}
              color="#ffffff"
            />
          </Animated.View>

          <Animated.View style={[styles.actionButton, videoCameraStyle]}>
            <Icon
              name="videocam"
              size={ACTION_BUTTON_ICON_SIZE}
              color="#ffffff"
            />
          </Animated.View>

          <Animated.View style={[styles.actionButton, writeStatusStyle]}>
            <Icon
              name="chatbubbles"
              size={ACTION_BUTTON_ICON_SIZE}
              color="#ffffff"
            />
          </Animated.View>

          {/*<Animated.View style={[StyleSheet.absoluteFillObject, cursorStyle]}>*/}
          {/*  <Icon name="add-circle" size={34} color="#000000" />*/}
          {/*</Animated.View>*/}

          <Animated.View style={[styles.button, buttonStyle]}>
            <Text style={styles.buttonText}>+</Text>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default withTheme(AddButton, theme =>
  StyleSheet.create({
    container: {},
    dim: {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1,
      width,
      height: height - 24 - BOTTOM_TAB_HEIGHT,
    },
    buttonContainer: {
      width: BUTTON_SIZE,
      height: BUTTON_SIZE,
      borderRadius: BUTTON_SIZE / 2,
      backgroundColor: '#ffffff',
      top: -10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: BORDER,
      borderColor: '#ffffff',
      zIndex: 10,
    },
    button: {
      width: BUTTON_SIZE - BORDER * 2,
      height: BUTTON_SIZE - BORDER * 2,
      borderRadius: BUTTON_SIZE / 2,
      backgroundColor: theme.COLORS.primary,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 15,
    },
    buttonText: {fontSize: 30, color: 'white', top: -1},
    actionButton: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 16,
      width: ACTION_BUTTON_SIZE,
      height: ACTION_BUTTON_SIZE,
      borderRadius: ACTION_BUTTON_SIZE / 2,
      borderWidth: 1,
      borderColor: '#ffffff',
      // left: -5,
    },
  }),
);
