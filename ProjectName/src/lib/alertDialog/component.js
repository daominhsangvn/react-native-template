import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Modal, View} from 'react-native';
import Alert from './Alert';
import AlertDialogService from './service';

const AlertDialogComponent = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState({
    type: 'error',
    message: '',
  });
  const promise = useRef(null);
  const alertRef = useRef({});

  const handleCancelAlert = () => {
    promise.current.resolve();
    setVisible(false);
  };

  const AlertComponent = useMemo(() => {
    return (
      <Modal animationType="fade" transparent={true} visible={visible}>
        <Alert config={config} onPress={handleCancelAlert} />
      </Modal>
    );
  }, [visible, config]);

  const show = useCallback(config => {
    promise.current = config.promise;
    setConfig({
      type: config.type,
      message: config.message,
    });
    setVisible(true);
  }, []);

  useEffect(() => {
    alertRef.current = {
      show,
    };

    AlertDialogService.setRef(alertRef.current);
  }, [show]);

  return <View>{AlertComponent}</View>;
});

export default AlertDialogComponent;
