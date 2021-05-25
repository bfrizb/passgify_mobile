import React, { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../redux/actions";

export const TextInputCustom = (props) => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settingsReducer);

  const initiallyHidden = props.hidden === undefined ? true : props.hidden;
  const [hidden, setHidden] = React.useState(initiallyHidden);
  const [tempText, setTempText] = useState(settings[props.settingKey]);

  return (
    <View
      style={[
        {
          marginVertical: 10,
          justifyContent: "center",
          flexDirection: "row",
        },
      ]}
    >
      <TextInput
        mode="outlined"
        label={props.label}
        secureTextEntry={hidden}
        value={tempText}
        onChangeText={(text) => setTempText(text)}
        onEndEditing={() => dispatch(updateSetting(props.settingKey, tempText))}
        style={{
          fontSize: 30,
          width: "100%",
        }}
        right={
          <TextInput.Icon
            name={hidden ? "eye" : "eye-off"}
            onPress={() => setHidden(!hidden)}
            size={40}
            style={{ marginRight: "80%" }}
          />
        }
      />
    </View>
  );
};

/* KEEP as reminder: Info button is ugly

      <IconButton
        icon="information"
        size={40}
        onPress={() => console.log("Pressed")}
        style={{ margin: 0, alignSelf: "center" }}
      />
*/
