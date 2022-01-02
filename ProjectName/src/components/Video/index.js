import React, {useCallback, useEffect, useRef, useState} from 'react';
import {createThumbnail} from 'react-native-create-thumbnail';
import ImageResizer from 'react-native-image-resizer';
import VideoPlayer from 'react-native-video-player';
import {mergeStyles} from '@lib/utils/helpers';
import {TouchableWithoutFeedback, View} from 'react-native';

const Video = ({
  paused = true,
  style,
  height = 300,
  resizeMode,
  source,
  ...rest
}) => {
  const unmountRef = useRef(false);
  const [thumbnail, setThumbnail] = useState('');
  const [isPaused, setIsPaused] = useState(paused);

  const play = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  useEffect(() => {
    createThumbnail({
      url: source.uri,
    })
      .then(response => {
        if (!unmountRef.current) {
          ImageResizer.createResizedImage(
            response.path,
            400,
            400,
            'JPEG',
            100,
            0,
            null,
            false,
            {onlyScaleDown: true},
          )
            .then(res => {
              if (!unmountRef.current) {
                setThumbnail(res.uri);
              }
            })
            .catch(err => {});
        }
      })
      .catch(err => {});

    return () => {
      setThumbnail('');
      setIsPaused(true);
    };
  }, [source]);

  useEffect(() => {
    unmountRef.current = false;

    return () => {
      unmountRef.current = true;
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={play}>
      <View
        style={mergeStyles(
          {
            height,
            width: '100%',
          },
          style,
        )}>
        <VideoPlayer
          video={source}
          autoplay={false}
          thumbnail={{uri: thumbnail ? thumbnail : null}}
          style={{height}}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Video;
