import React from "react";
import { Text, View } from "react-native";
import { CustomSwitch } from "../components/CustomSwitch";
import { DropDownCustom } from "../components/DropDownCustom";
import { TextInputCustom } from "../components/TextInputCustom";

// TODO (P2): Erase Secret Key when changing screens
// TODO (P2): Permanently hide salt after entered (display warning)

// TODO (P9): Support older versions of passgify
export default function SettingsScreen() {
  return (
    <View style={{ padding: "5%" }}>
      <Text style={{ fontSize: 40, marginVertical: 10, color: "gray" }}>
        Settings
      </Text>
      <DropDownCustom
        label="Passgify Version"
        settingKey="version"
        options={[3]}
      />

      <TextInputCustom label="Password Prefix" settingKey="prefix" />

      <TextInputCustom label="Password Salt" settingKey="salt" />

      <DropDownCustom
        label="Seconds to Overwrite Clipboard"
        settingKey="overwriteSeconds"
        options={[60, 30, 10, 5]}
      />

      <DropDownCustom
        label="Hashing Algorithm"
        settingKey="hashAlg"
        options={["sha512", "sha256"]}
      />

      <View style={{ width: "90%" }}>
        <CustomSwitch
          label="Erase Secret Key when changing screens (recommended)?"
          settingKey="eraseOnChangeScreens"
          marginBetween={20}
        />
      </View>
    </View>
  );
}
