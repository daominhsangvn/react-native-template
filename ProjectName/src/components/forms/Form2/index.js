import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import uniqBy from 'lodash/uniqBy';
import {Form2Context} from './Context';

const Form2 = React.forwardRef(
  ({children, schema, onSubmit, defaultValues = {}}, ref) => {
    const fieldsRef = useRef({});

    const reset = useCallback(values => {
      Object.keys(values).forEach(k => {
        if (fieldsRef.current[k]) {
          fieldsRef.current[k].resetValue(values[k]);
        }
      });
    }, []);

    const submit = useCallback(() => {
      const values = Object.keys(fieldsRef.current).reduce((p, c) => {
        p[c] = fieldsRef.current[c].value;

        fieldsRef.current[c].clearError();

        return p;
      }, {});

      schema
        .validate(values, {abortEarly: false})
        .then(onSubmit)
        .catch(function (err) {
          let errors = err.inner.map(e => ({
            message: e.message,
            path: e.path,
          }));
          errors = uniqBy(errors, 'path');
          errors.forEach(e => {
            if (fieldsRef.current[e.path]) {
              fieldsRef.current[e.path].setError(e.message);
            }
          });
        });
    }, [onSubmit]);

    const register = useCallback((name, config) => {
      if (!fieldsRef.current[name]) {
        fieldsRef.current[name] = {
          value: undefined,
          ...config,
        };
      }
    }, []);

    const unregister = useCallback(name => {
      delete fieldsRef.current[name];
    }, []);

    const setValue = useCallback((name, value) => {
      if (!fieldsRef.current[name]) {
        throw new Error("Field 'name' doesn't exist");
      }

      fieldsRef.current[name].value = value;
    }, []);

    useEffect(() => {
      Object.keys(defaultValues).forEach(k => {
        if (fieldsRef.current[k]) {
          fieldsRef.current[k].resetValue(defaultValues[k]);
        }
      });
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return {
          submit,
          reset,
        };
      },
      [submit, reset],
    );

    return (
      <Form2Context.Provider value={{register, unregister, setValue, schema}}>
        {children}
      </Form2Context.Provider>
    );
  },
);

export default Form2;
