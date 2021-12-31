import React from 'react';
import {StyleSheet, Text as RNText} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import {mergeStyles} from '@lib/utils/helpers';
import useSchemeValue from '@lib/themes/useSchemeValue';

const Text = ({style, theme, ...props}) => {
  const textColor = useSchemeValue('TEXT.primary');

  return <RNText {...props} style={mergeStyles({color: textColor}, style)} />;
};

export default withTheme(Text, theme => StyleSheet.create({}));
