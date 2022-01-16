import Box from '@components/layouts/Box';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '@components/Button';
import {remScale} from '@lib/themes/utils';
import useAlertDiaLog from '@lib/alertDialog/useAlertDialog';
import Text from '@components/Text';
import EvenCols from '@components/layouts/EvenCols';
import Spacer from '@components/layouts/Spacer';
import Gap from '@components/Gap';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {selectThemeScheme, setScheme} from '@lib/themes/store';
import Icon from '@components/Icon';
import Screen from '@components/layouts/Screen';
import {useForm} from 'react-hook-form';
import FormField from '@components/Form/components/Field';
import FormTextInput from '@components/Form/components/TextInput';
import FormDateTimePicker from '@components/Form/components/DateTimePicker';
import FormSelect from '@components/Form/components/Select';
import FormCheckBox from '@components/Form/components/CheckBox';
import FormChoices from '@components/Form/components/Choices';
import {yupResolver} from '@lib/utils/yupResolver';
import FormMedia from '@components/Form/components/Media';
import NavBar from '@components/NavBar';
import ScrollView from '@components/ScrollView';
import useCollapsibleNavBar from '@lib/hooks/useCollapsibleNavBar';
import useStyles from '@lib/themes/useStyles';
import DelayRender from '@components/DelayRender';
import FormSwitch from '@components/Form/components/Switch';
import LinkButton from '@components/LinkButton';

const schema = yup.object().shape({
  // password: yup
  //   .string()
  //   .required('Password is required')
  //   .min(6, 'Password must be at least 6 characters'),
  // confirmPassword: yup
  //   .string()
  //   .required('Confirm Password is required')
  //   .oneOf([yup.ref('password')], 'Passwords must match'),
  // mediaphoto: yup.string().nullable().required('Photo is required'),
});

const _styles = {
  container: {
    padding: remScale(3),
  },
};

const SampleScreen = () => {
  const dispatch = useDispatch();
  const scheme = useSelector(selectThemeScheme);
  const styles = useStyles(_styles);
  const {showError, showSuccess, showWarning} = useAlertDiaLog();
  const [formValue, setFormValue] = useState({});
  const {scrollClamp, scrollHandler} = useCollapsibleNavBar();

  const onSubmit = useCallback(data => {
    setFormValue(data);
  }, []);

  const {control, handleSubmit} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      checkbox: true,
      choices: 'react',
      // mediaphoto: 'https://placeimg.com/640/480/any',
      // mediavideo:
      //   'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_640_3MG.mp4',
    },
  });

  return (
    <Screen>
      <NavBar title="Sample" y={scrollClamp} />
      <ScrollView
        navbar
        style={[StyleSheet.absoluteFillObject]}
        contentContainerStyle={styles.container}
        onScroll={scrollHandler}>
        <Box>
          <Text category="h6">Dark/Light</Text>
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

        <Gap v={1} />
        <Box>
          <Text category="h6">Alerts</Text>
          <Gap v={1} />
          <Box>
            <EvenCols cols={3}>
              <EvenCols.Item>
                <Button onPress={() => showError('Error message')}>
                  Error
                </Button>
              </EvenCols.Item>
              <EvenCols.Item>
                <Button onPress={() => showSuccess('Success message')}>
                  Success
                </Button>
              </EvenCols.Item>
              <EvenCols.Item>
                <Button onPress={() => showWarning('Warning message')}>
                  Warning
                </Button>
              </EvenCols.Item>
            </EvenCols>
          </Box>
        </Box>

        <Gap v={1} />
        <Box>
          <Text category="h6">Buttons</Text>
          <Gap v={1} />
          <EvenCols cols={3}>
            <EvenCols.Item>
              <Button>Normal</Button>
            </EvenCols.Item>
            <EvenCols.Item>
              <Button outline color="btn1">
                Outline
              </Button>
            </EvenCols.Item>
            <EvenCols.Item>
              <Button loading>Loading</Button>
            </EvenCols.Item>
          </EvenCols>
          <Gap v={1} />
          <Button disabled>Disabled</Button>
          <Gap v={1} />
          <EvenCols cols={2}>
            <EvenCols.Item>
              <Button left>Left align</Button>
            </EvenCols.Item>
            <EvenCols.Item>
              <Button right>Right align</Button>
            </EvenCols.Item>
          </EvenCols>
          <Gap v={1} />
          <EvenCols cols={2}>
            <EvenCols.Item>
              <Button
                leftAccessory={<Icon name="ios-person-outline" size={16} />}
                leftAccessoryAbsolute>
                Left icon
              </Button>
            </EvenCols.Item>
            <EvenCols.Item>
              <Button
                rightAccessory={<Icon name="ios-person-outline" size={16} />}
                rightAccessoryAbsolute>
                Right icon
              </Button>
            </EvenCols.Item>
          </EvenCols>
        </Box>

        <Gap v={1} />

        <Box center>
          <LinkButton>Link Button</LinkButton>
        </Box>

        <Gap v={1} />
        <Box>
          <Text category="h6">Form</Text>
          <Gap v={1} />

          <FormField
            name="email"
            control={control}
            leading={<Icon name="mail" size={remScale(1.4)} />}>
            <FormTextInput placeholder="Type your email" />
          </FormField>
          <Gap v={1} />
          <FormField
            name="username"
            control={control}
            trailing={<Icon name="ios-people" size={remScale(1.4)} />}>
            <FormTextInput placeholder="Type your username" />
          </FormField>
          <Gap v={1} />
          <FormField
            name="password"
            control={control}
            leading={
              <Icon name="ios-lock-closed-outline" size={remScale(1.4)} />
            }>
            <FormTextInput placeholder="Type your password" secure />
          </FormField>
          <Gap v={1} />
          <FormField
            name="confirmPassword"
            control={control}
            leading={
              <Icon name="ios-lock-closed-outline" size={remScale(1.4)} />
            }>
            <FormTextInput placeholder="Type your password again" secure />
          </FormField>
        </Box>
        <DelayRender>
          <Gap v={1} />
          <Box>
            <FormField
              name="datetime"
              control={control}
              leading={
                <Icon name="ios-calendar-outline" size={remScale(1.4)} />
              }>
              <FormDateTimePicker placeholder="Select date/time" />
            </FormField>
            <Gap v={1} />
            <FormField
              name="date"
              control={control}
              leading={
                <Icon name="ios-calendar-outline" size={remScale(1.4)} />
              }>
              <FormDateTimePicker mode="date" placeholder="Select a date" />
            </FormField>
            <Gap v={1} />
            <FormField
              name="time"
              control={control}
              leading={
                <Icon name="ios-calendar-outline" size={remScale(1.4)} />
              }>
              <FormDateTimePicker mode="time" placeholder="Select a time" />
            </FormField>
          </Box>

          <Gap v={1} />
          <Box>
            <FormField
              name="select"
              control={control}
              trailing={
                <Icon name="ios-chevron-down-outline" size={remScale(1.4)} />
              }>
              <FormSelect
                placeholder="Select a value"
                options={[
                  {label: 'Javascript', value: 'js'},
                  {label: 'Angular', value: 'ng'},
                  {label: 'ReactJS', value: 'react'},
                ]}
              />
            </FormField>
          </Box>

          <Gap v={1} />
          <Box>
            <FormField borderless noPadding name="switch" control={control}>
              <FormSwitch>Are you agree?</FormSwitch>
            </FormField>
          </Box>

          <Gap v={1} />
          <Box>
            <FormField
              borderless
              noPadding
              name="checkbox"
              control={control}>
              <FormCheckBox>
                Are you agree? 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19
                20 21 22 23 24 25 26 27 28 29 30
              </FormCheckBox>
            </FormField>
          </Box>

          <Gap v={1} />
          <Box>
            <FormField noPadding borderless name="choices" control={control}>
              <FormChoices
                options={[
                  {label: 'Javascript', value: 'js'},
                  {label: 'Angular', value: 'ng'},
                  {label: 'ReactJS', value: 'react'},
                ]}
              />
            </FormField>
          </Box>

          <Gap v={1} />
          <Box>
            <FormField
              noPadding
              borderless
              name="mediaphoto"
              label="Media (Photo)"
              control={control}>
              <FormMedia mediaType="photo" mime="jpeg" front={false} />
            </FormField>
          </Box>

          <Box>
            <FormField
              noPadding
              borderless
              name="mediaphotocrop"
              label="Media (Photo Cropping)"
              control={control}>
              <FormMedia mediaType="photo" cropping />
            </FormField>
          </Box>

          <Box>
            <FormField
              noPadding
              borderless
              name="mediavideo"
              label="Media (Video)"
              control={control}>
              <FormMedia mediaType="video" />
            </FormField>
          </Box>

          <Box>
            <FormField
              noPadding
              borderless
              name="mediaany"
              label="Media (Any)"
              control={control}>
              <FormMedia />
            </FormField>
          </Box>

          <Gap v={1} />
          <Box>
            <Button onPress={handleSubmit(onSubmit)}>SUBMIT</Button>
          </Box>
        </DelayRender>
        <Text>{JSON.stringify(formValue, null, 3)}</Text>
      </ScrollView>
    </Screen>
  );
};

export default SampleScreen;
