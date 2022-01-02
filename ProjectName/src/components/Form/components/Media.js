import React, {useCallback, useMemo, useRef, useState} from 'react';
import useField from '@components/Form/useField';
import Box from '@components/layouts/Box';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import withTheme from '@lib/themes/withTheme';
import ActionSheet from 'react-native-actions-sheet';
import Icon from '@components/Icon';
import Spacer from '@components/layouts/Spacer';
import {rem} from '@lib/themes/utils';
import ImagePicker from 'react-native-image-crop-picker';

import Text from '@components/Text';
import Video from '@components/Video';
import Gap from '@components/Gap';

const FormMedia = ({
  theme,
  mediaType,
  cropping = false,
  width,
  height,
  previewHeight = 300,
  previewWidth = '100%',
  previewResize = 'contain',
  front = true,
}) => {
  const {styles} = theme;
  const [paused, setPaused] = useState(false);
  const {
    field: {name, onBlur, onChange, ref, value},
    fieldState: {error, invalid, isDirty, isTouched},
    formState: {},
    disabled,
  } = useField();

  const [selectedValue, setSelectedValue] = useState(null);

  const takeActionText = useMemo(() => {
    if (mediaType === 'video') {
      return 'Record Video';
    } else if (mediaType === 'photo') {
      return 'Take Photo';
    } else {
      return 'Take Photo or Record Video';
    }
  }, [mediaType]);

  const placeHolderIcon = useMemo(() => {
    if (mediaType === 'photo') {
      return <Icon name="ios-image-outline" size={40} color="#dddddd" />;
    } else if (mediaType === 'video') {
      return <Icon name="ios-videocam-outline" size={40} color="#dddddd" />;
    } else {
      return (
        <Box style={{flexDirection: 'row'}}>
          <Icon name="ios-image-outline" size={40} color="#dddddd" />
          <Gap h={1} />
          <Icon name="ios-videocam-outline" size={40} color="#dddddd" />
        </Box>
      );
    }
  }, [mediaType]);

  const actionSheetRef = useRef();

  const options = useMemo(() => {
    const result = {
      cropping,
    };

    if (mediaType) {
      result.mediaType = mediaType;
    }

    if (width) {
      result.width = width;
    }

    if (height) {
      result.height = height;
    }

    result.useFrontCamera = front;

    return result;
  }, [mediaType, cropping, width, height, front]);

  const openActionSheet = useCallback(() => {
    actionSheetRef.current?.show();
  }, []);

  const takePhoto = useCallback(() => {
    ImagePicker.openCamera(options)
      .then(result => {
        setSelectedValue(result);
      })
      .catch(e => {})
      .finally(() => {
        actionSheetRef.current?.hide();
      });
  }, [options]);

  const chooseFromLibrary = useCallback(() => {
    ImagePicker.openPicker(options)
      .then(result => {
        setSelectedValue(result);
      })
      .catch(e => {})
      .finally(() => {
        actionSheetRef.current?.hide();
      });
  }, [options]);

  const deleteMedia = useCallback(() => {
    actionSheetRef.current?.hide();
    setSelectedValue(null);
  }, []);

  const edit = useCallback(() => {
    actionSheetRef.current?.show();
  }, []);

  return (
    <Box style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={openActionSheet}
        disabled={disabled}
        style={[
          styles.imageContainer,
          {height: previewHeight, width: previewWidth},
        ]}>
        {!selectedValue && placeHolderIcon}
        {!!selectedValue && selectedValue.mime.startsWith('image/') && (
          <Image
            source={{uri: selectedValue.path}}
            style={{height: previewHeight, width: '100%'}}
            resizeMode={previewResize}
          />
        )}
        {!!selectedValue && selectedValue.mime.startsWith('video/') && (
          <Video
            source={{uri: selectedValue.path}}
            height={previewHeight}
            resizeMode={previewResize}
          />
        )}
        {!!selectedValue && (
          <TouchableOpacity
            onPress={edit}
            style={{position: 'absolute', top: 10, right: 10}}>
            <Icon
              name="ios-create-outline"
              size={30}
              color="white"
              style={{
                shadowOpacity: 2,
                textShadowRadius: 4,
                textShadowOffset: {width: 2, height: 2},
              }}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <ActionSheet ref={actionSheetRef}>
        <Spacer style={styles.actionContainer}>
          <TouchableOpacity onPress={takePhoto} style={styles.button}>
            <Text style={styles.buttonText}>{takeActionText}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={chooseFromLibrary} style={styles.button}>
            <Text style={styles.buttonText}>Choose From Library</Text>
          </TouchableOpacity>
          {!!selectedValue && (
            <TouchableOpacity onPress={deleteMedia} style={styles.button}>
              <Text style={[styles.buttonText, {color: 'red'}]}>Remove</Text>
            </TouchableOpacity>
          )}
        </Spacer>
      </ActionSheet>
    </Box>
  );
};

export default withTheme(FormMedia, () =>
  StyleSheet.create({
    container: {},
    button: {
      alignItems: 'center',
      padding: rem(0.7),
    },
    buttonText: {
      fontWeight: '500',
    },
    imageContainer: {
      width: '100%',
      backgroundColor: '#cccccc',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      position: 'relative',
    },
    actionContainer: {
      padding: rem(1),
    },
  }),
);
