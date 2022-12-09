class Hotkey {
  constructor(hotkeysText) {
    this.keysDetail = this.parseKeysText(hotkeysText);
  }

  parseKeysText(hotkeysText) {
    const hotkeysList = hotkeysText.toLowerCase().replaceAll(' ', '').split(',');

    return hotkeysList.map((key) =>
      key.split('+').reduce(
        (acc, hotkeyPart) => {
          const actions = {
            ctrl: () => (acc.ctrl = true),
            shift: () => (acc.shift = true),
            alt: () => (acc.alt = true),
          };

          if (actions[hotkeyPart]) {
            actions[hotkeyPart]();
          } else {
            acc.key = hotkeyPart;
          }

          return acc;
        },
        { ctrl: false, shift: false, alt: false, key: null }
      )
    );
  }

  compareWithEvent(e) {
    return this.keysDetail.some(
      (keyDetail) =>
        keyDetail.ctrl === e.ctrlKey &&
        keyDetail.shift === e.shiftKey &&
        keyDetail.alt === e.altKey &&
        keyDetail.key === e.key.toLowerCase()
    );
  }
}

function hotkey(hotkeysStr, callback, params) {
  const elem = params.elem || window;
  const hotkey = new Hotkey(hotkeysStr);
  const listener = (e) => {
    if (hotkey.compareWithEvent(e)) {
      callback();
      if (params.preventDefault) {
        e.preventDefault();
      }
    }
  };

  elem.addEventListener('keydown', listener);
  return () => elem.removeEventListener('keydown', listener);
}
