class Service {
  _ref;

  setRef(ref) {
    this._ref = ref;
  }

  show({message, type, promise}) {
    this._ref.show({message, type, promise});
  }
}

const AlertDialogService = new Service();

export default AlertDialogService;
