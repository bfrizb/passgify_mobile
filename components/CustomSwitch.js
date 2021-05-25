import React from "react";
import { Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../redux/actions";

export const CustomSwitch = (props) => {
  const settings = useSelector((state) => state.settingsReducer);
  const dispatch = useDispatch();

  return (
    <View
      style={[
        { flexDirection: "row", alignItems: "center", marginVertical: 10 },
      ]}
    >
      <View style={{ marginRight: props.marginBetween }}>
        <Text style={{ fontSize: 20 }}>{props.label}</Text>
      </View>
      <Switch
        value={settings[props.settingKey]}
        onValueChange={() =>
          dispatch(updateSetting(props.settingKey, !settings[props.settingKey]))
        }
      />
    </View>
  );
};

/* KEEP as reminder: Checkbox is ugly on iOS

      <View style={{ borderWidth: "2" }}>
        <Checkbox
          style={{ borderWidth: "5", borderColor: "black" }}
          status={settings[props.settingKey] ? "checked" : "unchecked"}
          onPress={() =>
            dispatch(
              updateSetting(props.settingKey, !settings[props.settingKey])
            )
          }
        />
      </View>
*/
