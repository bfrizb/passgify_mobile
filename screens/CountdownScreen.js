import Clipboard from "expo-clipboard";
import * as Crypto from "expo-crypto";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { DEFAULT_LENGTH } from "../redux/reducers";
import { getDefaultPb64Map, pb64Digest } from "../utils";

const HASH_ALG_MAP = {
  sha256: Crypto.CryptoDigestAlgorithm.SHA256,
  sha512: Crypto.CryptoDigestAlgorithm.SHA512,
  md5: Crypto.CryptoDigestAlgorithm.MD5,
};

const generatePassword = async (settings) => {
  const hexDigest = await Crypto.digestStringAsync(
    HASH_ALG_MAP[settings.hashAlg],
    settings.serviceId + settings.salt + settings.secretKey
  );
  const pb64Output = pb64Digest(
    hexDigest,
    getDefaultPb64Map(),
    settings.version
  );
  const prefix = settings.usePrefix ? settings.prefix : "";
  const password = (prefix + pb64Output).substring(0, settings.length);
  console.log("Digest: ", password);
  return password;
};

export const overwriteClipboard = (setIsOverwritten) => {
  Clipboard.setString("z".repeat(DEFAULT_LENGTH));
  if (setIsOverwritten !== null) setIsOverwritten(true);
};

export default function CountdownScreen() {
  const [isOverwritten, setIsOverwritten] = useState(false);
  const settings = useSelector((state) => state.settingsReducer);
  const homeScreenSettings = [
    settings.serviceId,
    settings.secretKey,
    settings.usePrefix,
    settings.length,
  ];
  useEffect(() => {
    (async () => {
      const pw = await generatePassword(settings);
      Clipboard.setString(pw);
    })();
    return () => {
      if (settings.eraseOnChangeScreens) overwriteClipboard(null);
    };
  }, homeScreenSettings);

  let countdownStatus;
  if (isOverwritten) {
    countdownStatus = (
      <Text
        style={{
          fontSize: 50,
          textAlign: "center",
          color: "gray",
        }}
      >
        Password{"\n"}Erased
      </Text>
    );
  } else {
    <Text>Password Copied to Clipboard!</Text>;
    countdownStatus = (
      <Countdown
        date={Date.now() + settings.overwriteSeconds * 1000}
        onComplete={() => overwriteClipboard(setIsOverwritten)}
        renderer={({ hours, minutes, seconds, completed }) => {
          if (completed) {
            // Render a complete state
            return null;
          } else {
            // Render a countdown
            let timeUnit = seconds == 1 ? "second" : "seconds";
            let adjustedSecs = seconds == 0 ? 60 : seconds; // TODO (P6): Should be a better way
            return (
              <>
                <Text
                  style={{
                    fontSize: 30,
                    textAlign: "center",
                    textAlignVertical: "bottom",
                  }}
                >
                  Overwriting Clipboard in...{"\n"}
                </Text>
                <Text
                  style={{
                    fontSize: 50,
                    textAlign: "center",
                  }}
                >
                  {adjustedSecs} {timeUnit}
                </Text>
              </>
            );
          }
        }}
      />
    );
  }

  const buttonLabel = isOverwritten
    ? "Clipboard Overwritten"
    : "Overwrite Clipboard";
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <View
        style={{
          flex: 2,
          justifyContent: "flex-end",
          paddingBottom: "5%",
        }}
      >
        {countdownStatus}
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          mode="contained"
          disabled={isOverwritten}
          onPress={() => overwriteClipboard(setIsOverwritten)}
          uppercase={false}
          labelStyle={{
            fontSize: 28,
            width: "80%",
          }}
          contentStyle={{ paddingVertical: "5%" }}
        >
          {buttonLabel}
        </Button>
      </View>
      <View
        style={{
          flex: 3,
          alignItems: "center",
          paddingTop: "5%",
        }}
      >
        <Icon
          name={isOverwritten ? "lock" : "lock-open"}
          size={200}
          color={isOverwritten ? "gray" : "black"}
        />
      </View>
    </View>
  );
}
