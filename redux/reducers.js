import { getDefaultPb64Map, getRandomPrefix, pb64Digest } from "../utils";
import { UPDATE_STATE } from "./actions";

const DEFAULT_VERSION = 3;
export const DEFAULT_LENGTH = 32;

const defaultPassgifySettings = {
  version: DEFAULT_VERSION,
  prefix: getRandomPrefix(),
  usePrefix: true,
  length: DEFAULT_LENGTH,
  salt: pb64Digest(String(Math.random()), getDefaultPb64Map(), DEFAULT_VERSION),
  eraseOnChangeScreens: true,
  hashAlg: "sha512",
  overwriteSeconds: 10,
};

export const settingsReducer = (state = defaultPassgifySettings, action) => {
  switch (action.type) {
    case UPDATE_STATE:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};
