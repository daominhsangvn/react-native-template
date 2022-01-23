import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Box from '@components/layouts/Box';
import useStyles from '@lib/themes/useStyles';
import Input from './Input';
import Modal from './Modal';
import SimpleSelect from './SimpleSelect';

const _styles = {
  container: {},
};

const Select = React.forwardRef((props, ref) => {
  const styles = useStyles(_styles);
  const {
    searchable = false,
    options = [],
    renderOption,
    placeholder = '',
    value,
    onChange,
    multi = false,
    customStyles = {},
    itemHeight = 50,
    modal = false,
    onFilter,
    name,
    hideOnSelect = true,
  } = props;

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const pickerRef = useRef();

  const containerStyle = useMemo(
    () => [styles.container, customStyles.container],
    [customStyles.container, styles.container],
  );

  const shouldUseModal = useMemo(() => {
    return multi || searchable || modal;
  }, [multi, searchable, modal]);

  const onPress = useCallback(() => {
    if (shouldUseModal) {
      setVisible(true);
    } else {
      pickerRef?.current?.show();
    }
  }, [shouldUseModal]);

  const onUpdate = useCallback(selectedValues => {
    setSelected(selectedValues);
    onChange(selectedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Array.isArray(value)) {
      setSelected(value);
    } else {
      setSelected([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Box style={containerStyle}>
      <Input
        onPress={onPress}
        placeholder={placeholder}
        customStyles={customStyles}
        selected={selected}
        multi={multi}
        ref={ref}
        name={name}
      />
      {shouldUseModal && (
        <Modal
          data={options}
          visible={visible}
          setVisible={setVisible}
          customStyles={customStyles}
          multi={multi}
          searchable={searchable}
          itemHeight={itemHeight}
          onChange={onUpdate}
          selected={selected}
          onFilter={onFilter}
          renderOption={renderOption}
          name={name}
          hideOnSelect={hideOnSelect}
        />
      )}
      {!shouldUseModal && (
        <SimpleSelect
          ref={pickerRef}
          onChange={onUpdate}
          value={selected}
          options={options}
          name={name}
        />
      )}
    </Box>
  );
});

export default Select;
