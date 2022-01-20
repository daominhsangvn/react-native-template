import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BOTTOM_TAB_HEIGHT, COLORS} from '@configs/themes/var';
import useStyles from '@lib/themes/useStyles';

const _styles = {
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    height: BOTTOM_TAB_HEIGHT,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 6.84,
    //
    // elevation: 11,
  },
  buttonContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  label: {fontSize: 12, marginTop: 3, color: '#4E5969'},
  labelFocused: {color: '#fd6654'},
};

const CustomTabBar = props => {
  const styles = useStyles(_styles);
  const {state, descriptors, navigation} = props;
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            if (options.emptyRoute) {
              return;
            }

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={`tab-${index}`}
              activeOpacity={1}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={mergeStyles(styles.buttonContainer, {
                borderBottomWidth: 1,
                borderBottomColor: isFocused ? COLORS.primary : 'transparent',
              })}>
              {options.tabBarIcon ? (
                <>
                  {options.tabBarIcon({
                    color: isFocused ? COLORS.primary : '#4E5969',
                    focused: isFocused,
                    navigation,
                  })}
                  {options.labelShown && (
                    <Text
                      style={[
                        styles.label,
                        isFocused ? styles.labelFocused : styles.label,
                      ]}>
                      {label}
                    </Text>
                  )}
                </>
              ) : (
                options.labelShown && (
                  <Text
                    style={[
                      styles.label,
                      isFocused ? styles.labelFocused : styles.label,
                    ]}>
                    {label}
                  </Text>
                )
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </GestureHandlerRootView>
  );
};

export default CustomTabBar;
