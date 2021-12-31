import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Form2FieldContext} from '@components/forms/Form2/FieldContext';
import {Form2Context} from '@components/forms/Form2/Context';
import useRefState from '@components/forms/Form2/useRefState';
import {useThrottleFn} from 'react-use';

const useField = ({name} = {}) => {
  const fieldContext = useContext(Form2FieldContext);
  const formContext = useContext(Form2Context);
  const fieldName = useMemo(() => {
    return name || fieldContext.name;
  }, [name, fieldContext.name]);
  const [fieldError, setFieldError] = useState(null);
  const fieldRef = useRef();
  const [isDirty, setIsDirty] = useState(false);
  const [value, setValue, valueRef] = useRefState(undefined);
  const onChange = useCallback(
    value => {
      formContext.setValue(fieldName, value);
      setIsDirty(true);
      setValue(value);
    },
    [fieldName, formContext, setValue],
  );

  const setError = useCallback(errorMessage => {
    if (errorMessage) {
      setFieldError({message: errorMessage});
    } else {
      setFieldError(null);
    }
  }, []);

  const clearError = useCallback(() => {
    setFieldError(null);
  }, []);

  const resetValue = useCallback(
    value => {
      formContext.setValue(fieldName, value);
      setValue(value);
    },
    [fieldName, formContext, setValue],
  );

  useEffect(() => {
    formContext.register(fieldName, {
      value: valueRef.current,
      fieldRef,
      setError,
      clearError,
      resetValue,
    });

    return () => {
      formContext.unregister(fieldName);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formContext.unregister, fieldName, clearError, setError]);

  useThrottleFn(
    (value, isDirty) => {
      if (isDirty) {
        try {
          formContext.schema.validateSyncAt(name, {[name]: value});
          setError(null);
        } catch (e) {
          if (!e.message.includes('The schema does not contain the path')) {
            setError(e.message);
          }
        }
      }
    },
    300,
    [value, isDirty],
  );

  return {
    error: fieldError,
    isDirty,
    value,
    onChange,
    fieldRef,
    name: fieldName,
  };
};

export default useField;
