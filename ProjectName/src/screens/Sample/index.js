import Box from '@components/layouts/Box';
import React, {useCallback, useRef} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import Spacer from '@components/layouts/Spacer';
import Button from '@components/Button';
import {rem} from '@lib/themes/utils';
import useAlertDiaLog from '@lib/alertDialog/useAlertDialog';
import Text from '@components/Text';
import Grid from '@components/layouts/Grid';
import Gap from '@components/Gap';
import Form from '@components/forms/Form';
import Input from '@components/forms/Input';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@lib/utils/yupResolver';
import * as yup from 'yup';
import Logger from '@lib/utils/Logger';
import DateTimePicker from '@components/forms/DateTimePicker';
import DatePicker from '@components/forms/DatePicker';
import TimePicker from '@components/forms/TimePicker';
import Select from '@components/forms/Select';
import CheckBox from '@components/forms/CheckBox';
import RadioGroup from '@components/forms/RadioGroup';
import {useDispatch, useSelector} from 'react-redux';
import {selectThemeScheme, setScheme} from '@lib/themes/store';
import Icon from '@components/Icon';
import Screen from '@components/layouts/Screen';
import Form2 from '@components/forms/Form2';
import Form2Control from '@components/forms/Form2/Field';
import Form2TextInput from '@components/forms/Form2/components/TextInput';
import Form2Field from '@components/forms/Form2/Field';

const schema = yup.object().shape({
  email: yup.string().required().email().min(6).max(50),
});

const SampleScreen = ({theme}) => {
  const dispatch = useDispatch();
  const scheme = useSelector(selectThemeScheme);
  const {styles} = theme;
  const {showError, showSuccess, showWarning} = useAlertDiaLog();

  const {control, handleSubmit} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      // select: 'ng',
      // radiogroup: 'js',
    },
  });

  const onSubmit = useCallback(data => {
    Logger.log('onSubmit', data);
  }, []);

  const formRef = useRef();

  return (
    <Screen>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{padding: rem(1)}}>
        <Form2 ref={formRef} schema={schema} onSubmit={onSubmit}>
          <Spacer>
            <Box>
              <Text style={styles.heading}>Dark/Light</Text>
              <Gap v={1} />
              <Button
                onPress={() => {
                  dispatch(
                    setScheme({scheme: scheme === 'dark' ? 'light' : 'dark'}),
                  );
                }}
                color="style1">
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
              {/*<Form.Group control={control} name="email">*/}
              {/*  <Form.Label>Input</Form.Label>*/}
              {/*  <Form.Control leading={<Icon name="mail" size={rem(1.4)} />}>*/}
              {/*    <Input placeholder="Type your email" />*/}
              {/*  </Form.Control>*/}
              {/*</Form.Group>*/}
              {/*<Form.Group control={control} name="username">*/}
              {/*  <Form.Control*/}
              {/*    trailing={<Icon name="ios-people" size={rem(1.4)} />}>*/}
              {/*    <Input placeholder="Type your username" />*/}
              {/*  </Form.Control>*/}
              {/*</Form.Group>*/}
              {/*<Form.Group control={control} name="password">*/}
              {/*  <Form.Control*/}
              {/*    leading={*/}
              {/*      <Icon name="ios-lock-closed-outline" size={rem(1.4)} />*/}
              {/*    }>*/}
              {/*    <Input placeholder="Type your password" secure />*/}
              {/*  </Form.Control>*/}
              {/*</Form.Group>*/}
            </Box>
            {/*<Box>*/}
            {/*  <Form.Group control={control} name="datetime">*/}
            {/*    <Form.Label>Date/Time</Form.Label>*/}
            {/*    <Form.Control*/}
            {/*      leading={<Icon name="ios-calendar-outline" size={rem(1.4)} />}>*/}
            {/*      <DateTimePicker*/}
            {/*        inputProps={{placeholder: 'Select a date-time'}}*/}
            {/*      />*/}
            {/*    </Form.Control>*/}
            {/*  </Form.Group>*/}
            {/*  <Form.Group control={control} name="date">*/}
            {/*    <Form.Control*/}
            {/*      leading={<Icon name="ios-calendar-outline" size={rem(1.4)} />}>*/}
            {/*      <DatePicker inputProps={{placeholder: 'Select a date'}} />*/}
            {/*    </Form.Control>*/}
            {/*  </Form.Group>*/}
            {/*  <Form.Group control={control} name="time">*/}
            {/*    <Form.Control*/}
            {/*      leading={<Icon name="ios-time-outline" size={rem(1.4)} />}>*/}
            {/*      <TimePicker inputProps={{placeholder: 'Select a time'}} />*/}
            {/*    </Form.Control>*/}
            {/*  </Form.Group>*/}
            {/*</Box>*/}
            {/*<Box>*/}
            {/*  <Form.Group control={control} name="select">*/}
            {/*    <Form.Label>Select</Form.Label>*/}
            {/*    <Form.Control*/}
            {/*      trailing={*/}
            {/*        <Icon name="ios-chevron-down-outline" size={rem(1.4)} />*/}
            {/*      }>*/}
            {/*      <Select*/}
            {/*        inputProps={{placeholder: 'Select an option'}}*/}
            {/*        options={[*/}
            {/*          {label: 'Javascript', value: 'js'},*/}
            {/*          {label: 'Angular', value: 'ng'},*/}
            {/*          {label: 'ReactJS', value: 'react'},*/}
            {/*        ]}*/}
            {/*      />*/}
            {/*    </Form.Control>*/}
            {/*  </Form.Group>*/}
            {/*</Box>*/}
            {/*<Box>*/}
            {/*  <Form.Group control={control} name="checkbox">*/}
            {/*    <Form.Label>Checkbox</Form.Label>*/}
            {/*    <Form.Control containerStyle={{borderBottomWidth: 0}}>*/}
            {/*      <CheckBox text="Are you agree?" />*/}
            {/*    </Form.Control>*/}
            {/*  </Form.Group>*/}
            {/*</Box>*/}
            {/*<Box>*/}
            {/*  <Form.Group control={control} name="radiogroup">*/}
            {/*    <Form.Label>Radio Group</Form.Label>*/}
            {/*    <Form.Control containerStyle={{borderBottomWidth: 0}}>*/}
            {/*      <RadioGroup*/}
            {/*        options={[*/}
            {/*          {label: 'Javascript', value: 'js'},*/}
            {/*          {label: 'Angular', value: 'ng'},*/}
            {/*          {label: 'ReactJS', value: 'react'},*/}
            {/*        ]}*/}
            {/*      />*/}
            {/*    </Form.Control>*/}
            {/*  </Form.Group>*/}
            {/*</Box>*/}
            <Box>
              <Button onPress={() => formRef.current.submit()}>SUBMIT</Button>
            </Box>
          </Spacer>
        </Form2>
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
