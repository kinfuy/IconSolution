import os from 'os';
/**
 * Get ip(v4) address
 * @return {String} the ipv4 address or 'localhost'
 */
export const getIPAddress = function () {
  let netWorkList = os.networkInterfaces();
  let ip = '';
  for (let dev in netWorkList) {
    netWorkList[dev]!.forEach((val: any) => {
      if (ip === '' && val.family === 'IPv4' && !val.internal) {
        ip = val.address;
        return;
      }
    });
  }
  return ip || '127.0.0.1';
};
/**
 * 类型判断
 * @param obj
 * @returns
 */
export const typeOf = (obj: any): string => {
  const { toString } = Object.prototype;
  const map: { [key: string]: string } = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  return map[toString.call(obj)];
};
/**
 *是否不为空
 * @param val
 * @returns
 */
export const isNotEmpty = (val?: unknown): boolean => {
  if (val === undefined || val === null) {
    return false;
  }
  if (typeOf(val) === 'string') {
    if ((val as string).trim() === '') {
      return false;
    }
  }
  return true;
};
/**
 * @param obj
 * @description 去除对象值为空的字段
 */
export const rmObjEmptyFields = (obj: Record<string, any>): Record<string, any> => {
  if (!obj || typeOf(obj) !== 'object') return obj;

  return Object.keys(obj)
    .filter((key) => isNotEmpty(obj[key]))
    .reduce((_obj: Record<string, any>, key2: string) => {
      _obj[key2] = obj[key2];

      return _obj;
    }, {});
};

/**
 * @param obj
 * @description trim对象中的字符字段
 */
export const trimObjFields = (obj: Record<string, unknown>): Record<string, unknown> | undefined => {
  if (!obj || typeOf(obj) !== 'object') return undefined;

  Object.keys(obj).forEach((key) => {
    if (typeOf(obj[key]) === 'string') {
      obj[key] = (obj[key] as string).trim();
    }
  });

  return obj;
};
/**
 * @param obj 被过滤的对象
 * @param rmKeys 需要过滤的key
 * @returns {*}
 */
export const omit = (obj: Record<string, unknown> = {}, keys: string[]): Record<string, unknown> => {
  const residue = Object.keys(obj).filter((key) => !keys.some((rmKey) => rmKey === key));
  return Object.assign({}, ...residue.map((key) => ({ [key]: obj[key] })));
};

// deepCopy
export const deepCopy = (data: any): any => {
  const t = typeOf(data);
  let o: any;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i += 1) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    Object.keys(data).forEach((key) => {
      o[key] = deepCopy(data[key]);
    });
  }
  return o;
};

export const randomString = (len?: number): string => {
  const _len = len || 32;
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'; /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < _len; i += 1) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

export const generateUUID = (): string => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16);
  });
  return uuid;
};

export const encrypt = (str: string, pwd: string): string | null => {
  if (pwd == null || pwd.length <= 0) {
    console.log('Please enter a password with which to encrypt the message.');
    return null;
  }
  let prand = '';
  for (let i = 0; i < pwd.length; i += 1) {
    prand += pwd.charCodeAt(i).toString();
  }

  const sPos = Math.floor(prand.length / 5);
  const mult = parseInt(
    prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5),
    10
  );

  const incr = Math.ceil(pwd.length / 2);
  const modu = Math.pow(2, 31) - 1;
  if (mult < 2) {
    console.log(
      'Algorithm cannot find a suitable hash. Please choose a different password. \nPossible considerations are to choose a more complex or longer password.'
    );
    return null;
  }
  const salt: number = Math.round(Math.random() * 1000000000) % 100000000;

  prand += salt;
  while (prand.length > 10) {
    prand = (parseInt(prand.substring(0, 10), 10) + parseInt(prand.substring(10, prand.length), 10)).toString();
  }
  let _prand = (mult * Number(prand) + incr) % modu;
  let encChr: number;
  let encStr = '';
  for (let i = 0; i < str.length; i += 1) {
    encChr = parseInt((str.charCodeAt(i) ^ Math.floor((_prand / modu) * 255)).toString(), 10);
    if (encChr < 16) {
      encStr = `${encStr}0${encChr.toString(16)}`;
    } else encStr += encChr.toString(16);
    _prand = (mult * _prand + incr) % modu;
  }

  let _salt: string = salt.toString(16);
  while (_salt.length < 8) _salt = `0${_salt}`;
  encStr += _salt;
  return encStr;
};

export const decrypt = (str: string, pwd: string): string | null => {
  if (str == null || str.length < 8) {
    console.log(
      "A salt value could not be extracted from the encrypted message because it's length is too short. The message cannot be decrypted."
    );
    return null;
  }
  if (pwd == null || pwd.length <= 0) {
    console.log('Please enter a password with which to decrypt the message.');
    return null;
  }
  let prand = '';
  for (let i = 0; i < pwd.length; i += 1) {
    prand += pwd.charCodeAt(i).toString();
  }

  const sPos = Math.floor(prand.length / 5);
  const mult = parseInt(
    prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5),
    10
  );
  const incr = Math.round(pwd.length / 2);
  const modu = Math.pow(2, 31) - 1;
  const salt = parseInt(str.substring(str.length - 8, str.length), 16);
  str = str.substring(0, str.length - 8);
  prand += salt;
  while (prand.length > 10) {
    prand = (parseInt(prand.substring(0, 10), 10) + parseInt(prand.substring(10, prand.length), 10)).toString();
  }
  let _prand = (mult * Number(prand) + incr) % modu;
  let encChr: number;
  let encStr = '';
  for (let i = 0; i < str.length; i += 2) {
    encChr = parseInt((parseInt(str.substring(i, i + 2), 16) ^ Math.floor((_prand / modu) * 255)).toString(), 10);
    encStr += String.fromCharCode(encChr);
    _prand = (mult * _prand + incr) % modu;
  }
  return encStr;
};

export const debounce = (func: (...args: any[]) => void, wait = 500, immediate = true) => {
  let timeout: any;
  const debounceFunc = (...args: any[]) => {
    if (args[0] && args[0].persist) {
      args[0].persist();
    }
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(this, args);
      }
    };
    const callNow = immediate && !timeout;
    // console.log(callNow);
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(this, args);
    }
  };
  debounceFunc.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  return debounceFunc;
};
