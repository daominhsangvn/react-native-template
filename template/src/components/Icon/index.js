import React, {useMemo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {mergeStyles} from '@lib/utils/helpers';
import useStyles from '@lib/themes/useStyles';

const _styles = {
  icon: {},
};

const Icon = ({component = Ionicons, style, ...props}) => {
  const IconComponent = useMemo(() => component, [component]);
  const styles = useStyles(_styles);
  const iconStyle = useMemo(
    () => mergeStyles(styles.icon, style),
    [styles.icon, style],
  );

  const Component = useMemo(() => {
    return <IconComponent {...props} style={iconStyle} />;
  }, [props, iconStyle]);

  return Component;
};

export default Icon;
