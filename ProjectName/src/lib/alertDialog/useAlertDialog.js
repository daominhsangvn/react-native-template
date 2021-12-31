import React from 'react';
import LazyPromise from '@lib/utils/LazyPromise';
import AlertDialogService from '@lib/alertDialog/service';

const useAlertDialog = () => {
  const showError = message => {
    const promise = new LazyPromise();

    AlertDialogService.show({
      message,
      type: 'error',
      promise,
    });

    return promise.deferred;
  };

  const showSuccess = message => {
    const promise = new LazyPromise();

    AlertDialogService.show({
      message,
      type: 'success',
      promise,
    });

    return promise.deferred;
  };

  const showWarning = message => {
    const promise = new LazyPromise();

    AlertDialogService.show({
      message,
      type: 'warning',
      promise,
    });

    return promise.deferred;
  };

  return {showError, showSuccess, showWarning};
};

export default useAlertDialog;
