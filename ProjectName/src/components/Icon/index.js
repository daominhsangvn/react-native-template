import React, {useMemo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {mergeStyles} from '@lib/utils/helpers';

const Icon = ({component = Ionicons, style, ...props}) => {
  const IconComponent = useMemo(() => component, [component]);

  return <IconComponent {...props} style={mergeStyles(style)} />;
};

export default Icon;
