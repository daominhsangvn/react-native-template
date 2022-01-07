import Box from '@components/layouts/Box';
import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import Button from '@components/Button';
import {rem} from '@lib/themes/utils';
import useAlertDiaLog from '@lib/alertDialog/useAlertDialog';
import Text from '@components/Text';
import Grid from '@components/layouts/Grid';
import Spacer from '@components/layouts/Spacer';
import Gap from '@components/Gap';
import ScrollView from '@components/ScrollView';
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

const SampleScreen = ({theme}) => {
  const dispatch = useDispatch();
  const scheme = useSelector(selectThemeScheme);
  const {styles} = theme;
  const {showError, showSuccess, showWarning} = useAlertDiaLog();
  const [formValue, setFormValue] = useState({});

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
    <Screen scrollable scrollProps={{contentContainerStyle: {padding: rem(2)}}}>
      <Spacer>
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
                <Button onPress={() => showError('Error message')}>
                  Error
                </Button>
              </Grid.Item>
              <Grid.Item>
                <Button onPress={() => showSuccess('Success message')}>
                  Success
                </Button>
              </Grid.Item>
              <Grid.Item>
                <Button onPress={() => showWarning('Warning message')}>
                  Warning
                </Button>
              </Grid.Item>
            </Grid>
          </Box>
        </Box>

        <Box>
          <Text style={styles.heading}>Buttons</Text>
          <Gap v={1} />
          <Grid cols={3}>
            <Grid.Item>
              <Button>Normal</Button>
            </Grid.Item>
            <Grid.Item>
              <Button outline>Outline</Button>
            </Grid.Item>
            <Grid.Item>
              <Button loading>Loading</Button>
            </Grid.Item>
          </Grid>
          <Gap v={1} />
          <Button disabled>Disabled</Button>
          <Gap v={1} />
          <Grid cols={2}>
            <Grid.Item>
              <Button left>Left align</Button>
            </Grid.Item>
            <Grid.Item>
              <Button right>Right align</Button>
            </Grid.Item>
          </Grid>
          <Gap v={1} />
          <Grid cols={2}>
            <Grid.Item>
              <Button
                leftAccessory={<Icon name="ios-person-outline" size={12} />}
                leftAccessoryAbsolute>
                Left icon button
              </Button>
            </Grid.Item>
            <Grid.Item>
              <Button
                rightAccessory={<Icon name="ios-person-outline" size={12} />}
                rightAccessoryAbsolute>
                Right icon button
              </Button>
            </Grid.Item>
          </Grid>
        </Box>

        <Box>
          <Text style={styles.heading}>Form</Text>
          <Gap v={1} />

          <FormField
            name="email"
            control={control}
            label="Input"
            leading={<Icon name="mail" size={rem(1.4)} />}>
            <FormTextInput placeholder="Type your email" />
          </FormField>
          <FormField
            name="username"
            control={control}
            trailing={<Icon name="ios-people" size={rem(1.4)} />}>
            <FormTextInput placeholder="Type your username" />
          </FormField>
          <FormField
            name="password"
            control={control}
            leading={<Icon name="ios-lock-closed-outline" size={rem(1.4)} />}>
            <FormTextInput placeholder="Type your password" secure />
          </FormField>
          <FormField
            name="confirmPassword"
            control={control}
            leading={<Icon name="ios-lock-closed-outline" size={rem(1.4)} />}>
            <FormTextInput placeholder="Type your password again" secure />
          </FormField>
        </Box>

        <Box>
          <FormField
            name="datetime"
            control={control}
            label="Date/Time"
            leading={<Icon name="ios-calendar-outline" size={rem(1.4)} />}>
            <FormDateTimePicker placeholder="Select date/time" />
          </FormField>
          <FormField
            name="date"
            control={control}
            leading={<Icon name="ios-calendar-outline" size={rem(1.4)} />}>
            <FormDateTimePicker mode="date" placeholder="Select a date" />
          </FormField>
          <FormField
            name="time"
            control={control}
            leading={<Icon name="ios-calendar-outline" size={rem(1.4)} />}>
            <FormDateTimePicker mode="time" placeholder="Select a time" />
          </FormField>
        </Box>

        <Box>
          <FormField
            name="select"
            label="Select"
            control={control}
            trailing={<Icon name="ios-chevron-down-outline" size={rem(1.4)} />}>
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

        <Box>
          <FormField
            name="checkbox"
            label="Checkbox"
            control={control}
            containerStyle={{borderBottomWidth: 0}}>
            <FormCheckBox text="Are you agree?" />
          </FormField>
        </Box>

        <Box>
          <FormField
            name="choices"
            label="Choices"
            control={control}
            containerStyle={{borderBottomWidth: 0}}>
            <FormChoices
              options={[
                {label: 'Javascript', value: 'js'},
                {label: 'Angular', value: 'ng'},
                {label: 'ReactJS', value: 'react'},
              ]}
            />
          </FormField>
        </Box>
        <Box>
          <FormField
            name="mediaphoto"
            label="Media (Photo)"
            control={control}
            front={false}
            containerStyle={{borderBottomWidth: 0}}>
            <FormMedia mediaType="photo" mime="jpeg" />
          </FormField>
        </Box>
        <Box>
          <FormField
            name="mediaphotocrop"
            label="Media (Photo Cropping)"
            control={control}
            containerStyle={{borderBottomWidth: 0}}>
            <FormMedia mediaType="photo" cropping />
          </FormField>
        </Box>
        <Box>
          <FormField
            name="mediavideo"
            label="Media (Video)"
            control={control}
            containerStyle={{borderBottomWidth: 0}}>
            <FormMedia mediaType="video" />
          </FormField>
        </Box>
        <Box>
          <FormField
            name="mediaany"
            label="Media (Any)"
            control={control}
            containerStyle={{borderBottomWidth: 0}}>
            <FormMedia />
          </FormField>
        </Box>
        <Box>
          <Button onPress={handleSubmit(onSubmit)}>SUBMIT</Button>
        </Box>

        <Text>{JSON.stringify(formValue, null, 3)}</Text>
      </Spacer>
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
