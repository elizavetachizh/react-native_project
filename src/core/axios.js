//Вызов локального сервера из приложения Expo
//  можем получить IP-адрес во время выполнения, используя манифест Expo:

// Это установит api константу на адрес вашей локальной машины разработки в режиме разработки и на любой адрес, который вы используете в производстве.

import Constants from "expo-constants";
import axios from "axios";
const { manifest } = Constants;

axios.defaults.baseURL =
  "http://" + (typeof manifest.packagerOpts === `object` &&
  manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:5500`)
    : `api.example.com`);

console.log(axios.defaults.baseURL);

export default axios;
