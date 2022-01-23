import React, {useCallback, useMemo} from 'react';
import useStyles from '@lib/themes/useStyles';
import Box from '@components/layouts/Box';
import Text from '@components/Text';
import Icon from '@components/Icon';
import {remScale} from '@lib/themes/utils';
import {Pressable} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';

const _styles = {
  container: {
    padding: remScale(2),
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  selected: {
    backgroundColor: '#edf9ff',
  },
};

const Item = ({customStyles, checked, onPress, data, renderOption}) => {
  const styles = useStyles(_styles);

  const press = useCallback(() => {
    onPress(data);
  }, [onPress]);

  const containerStyle = useMemo(
    () =>
      mergeStyles(
        styles.container,
        customStyles.item,
        checked && {
          ...styles.selected,
          ...customStyles.selected,
        },
      ),
    [checked, customStyles.selected, customStyles.item],
  );

  const children = useMemo(() => {
    if (renderOption) {
      return renderOption({data, checked});
    }
    return (
      <Box row items="center">
        <Box flex>
          <Text>{data.item.label}</Text>
        </Box>
        {checked && (
          <Box>
            <Icon
              name="checkmark-outline"
              size={remScale(3)}
              color={'#00a2ff'}
            />
          </Box>
        )}
      </Box>
    );
  }, [checked]);

  return (
    <Pressable style={containerStyle} onPress={press}>
      {children}
    </Pressable>
  );
};

export default Item;
