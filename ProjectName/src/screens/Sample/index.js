import Box from '@components/layouts/Box';
import React, {useCallback, useRef, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import Button from '@components/Button';
import {rem} from '@lib/themes/utils';
import useAlertDiaLog from '@lib/alertDialog/useAlertDialog';
import Text from '@components/Text';
import Grid from '@components/layouts/Grid';
import Gap from '@components/Gap';
import * as yup from 'yup';
import Logger from '@lib/utils/Logger';
import {useDispatch, useSelector} from 'react-redux';
import {selectThemeScheme, setScheme} from '@lib/themes/store';
import Icon from '@components/Icon';
import Screen from '@components/layouts/Screen';
import Form2 from '@components/forms/Form2';
import Form2TextInput from '@components/forms/Form2/components/TextInput';
import Form2Field from '@components/forms/Form2/Field';
import Form2DateTimePicker from '@components/forms/Form2/components/DateTimePicker';
import Form2Select from '@components/forms/Form2/components/Select';
import Form2CheckBox from '@components/forms/Form2/components/CheckBox';
import Form2Choices from "@components/forms/Form2/components/Choices";

const schema = yup.object().shape({
  email: yup.string().required().email().min(6).max(50),
});

const SampleScreen = ({theme}) => {
  const dispatch = useDispatch();
  const scheme = useSelector(selectThemeScheme);
  const {styles} = theme;
  const {showError, showSuccess, showWarning} = useAlertDiaLog();
  const [formValue, setFormValue] = useState({});

  const onSubmit = useCallback(data => {
    setFormValue(data);
  }, []);

  const formRef = useRef();

  return (
    <Screen>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{padding: rem(1)}}>
        <Form2
          ref={formRef}
          schema={schema}
          onSubmit={onSubmit}
          defaultValues={{choices: 'js'}}>
          <Box>
            <Text style={styles.heading}>Dark/Light</Text>
            <Gap v={1} />
            <Button
              onPress={() => {
                dispatch(
                  setScheme({scheme: scheme === 'dark' ? 'light' : 'dark'}),
                );
              }}>
              Toggle
            </Button>
          </Box>

          <Box>
            <Text style={styles.heading}>Alerts</Text>
            <Gap v={1} />
            <Box>
              <Grid cols={3}>
                <Grid.Item>
                  <Button
                    color={'error'}
                    textStyle={{color: 'white'}}
                    onPress={() => showError('Error message')}>
                    Error
                  </Button>
                </Grid.Item>
                <Grid.Item>
                  <Button
                    color={'success'}
                    textStyle={{color: 'white'}}
                    onPress={() => showSuccess('Success message')}>
                    Success
                  </Button>
                </Grid.Item>
                <Grid.Item>
                  <Button
                    color={'warning'}
                    textStyle={{color: 'white'}}
                    onPress={() => showWarning('Warning message')}>
                    Warning
                  </Button>
                </Grid.Item>
              </Grid>
            </Box>
          </Box>

          <Box>
            <Text style={styles.heading}>Form</Text>
            <Gap v={1} />
            <Form2Field
              name="email"
              label="Input"
              leading={<Icon name="mail" size={rem(1.4)} />}>
              <Form2TextInput placeholder="Type your email" />
            </Form2Field>
            <Form2Field
              name="username"
              leading={<Icon name="ios-people" size={rem(1.4)} />}>
              <Form2TextInput placeholder="Type your username" />
            </Form2Field>
            <Form2Field
              name="password"
              leading={<Icon name="ios-lock-closed-outline" size={rem(1.4)} />}>
              <Form2TextInput placeholder="Type your password" secure />
            </Form2Field>
          </Box>
          <Box>
            <Form2Field
              name="datetime"
              label="Date/Time"
              leading={<Icon name="ios-calendar-outline" size={rem(1.4)} />}>
              <Form2DateTimePicker placeholder="Select date/time" />
            </Form2Field>
            <Form2Field
              name="date"
              leading={<Icon name="ios-calendar-outline" size={rem(1.4)} />}>
              <Form2DateTimePicker mode="date" placeholder="Select a date" />
            </Form2Field>
            <Form2Field
              name="time"
              leading={<Icon name="ios-calendar-outline" size={rem(1.4)} />}>
              <Form2DateTimePicker mode="time" placeholder="Select a time" />
            </Form2Field>
          </Box>
          <Box>
            <Form2Field
              name="select"
              label="Select"
              trailing={
                <Icon name="ios-chevron-down-outline" size={rem(1.4)} />
              }>
              <Form2Select
                placeholder="Select a value"
                options={[
                  {label: 'Javascript', value: 'js'},
                  {label: 'Angular', value: 'ng'},
                  {label: 'ReactJS', value: 'react'},
                ]}
              />
            </Form2Field>
          </Box>
          <Box>
            <Form2Field
              name="checkbox"
              label="Checkbox"
              containerStyle={{borderBottomWidth: 0}}>
              <Form2CheckBox text="Are you agree?" />
            </Form2Field>
          </Box>
          <Box>
            <Form2Field
              name="choices"
              label="Choices"
              containerStyle={{borderBottomWidth: 0}}>
              <Form2Choices
                options={[
                  {label: 'Javascript', value: 'js'},
                  {label: 'Angular', value: 'ng'},
                  {label: 'ReactJS', value: 'react'},
                ]}
              />
            </Form2Field>
          </Box>
          <Box>
            <Button onPress={() => formRef.current.submit()}>SUBMIT</Button>
          </Box>
        </Form2>

        <Gap v={2} />

        <Text>{JSON.stringify(formValue, null, 3)}</Text>
      </ScrollView>
    </Screen>
  );
};

export default withTheme(SampleScreen, () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    heading: {
      fontSize: rem(1.5),
    },
  }),
);
