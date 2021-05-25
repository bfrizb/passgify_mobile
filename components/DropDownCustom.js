import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../redux/actions";

const dropDownStyle = {
  backgroundColor: "yellow",
};
const textStyle = {
  fontSize: 20,
  textAlign: "center",
  fontWeight: "bold",
};

export const DropDownCustom = (props) => {
  const settings = useSelector((state) => state.settingsReducer);
  const dispatch = useDispatch();

  const options = props.options.map((opt) => {
    return { label: `${opt}`, value: opt };
  });

  return (
    <View
      style={[
        { flexDirection: "row", alignItems: "center", marginVertical: 10 },
      ]}
    >
      <View style={{ marginRight: 5 }}>
        <Text style={{ fontSize: 20 }}>{props.label}:</Text>
      </View>
      <View
        style={{
          flex: 1,
          borderWidth: 1,
        }}
      >
        {/* It seems like there should be a single way to do this, rather
          than needing to use both inputIOSContainer and inputAndroidContainer =/ */}
        <RNPickerSelect
          style={StyleSheet.create({
            inputIOSContainer: dropDownStyle,
            inputAndroidContainer: dropDownStyle,
            inputIOS: textStyle,
            inputAndroid: textStyle,
          })}
          value={settings[props.settingKey]}
          onValueChange={(value) => {
            if (value) dispatch(updateSetting(props.settingKey, value));
          }}
          items={options}
          placeholder={{ label: "", value: null }}
        />
      </View>
    </View>
  );
};
