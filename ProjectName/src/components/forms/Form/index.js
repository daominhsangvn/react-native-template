import React from 'react';
import {View} from 'react-native';
import Control from './components/Control';
import Group from './components/Group';
import Label from './components/Label';

const Form = ({children}) => {
  return <View>{children}</View>;
};

export default Object.assign(Form, {
  Group: Group,
  Label: Label,
  Control: Control,
});
