import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { CustomSwitch } from "../components/CustomSwitch";
import { DropDownCustom } from "../components/DropDownCustom";
import { TextInputCustom } from "../components/TextInputCustom";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ padding: "5%" }}>
      <Text style={{ fontSize: 40, marginVertical: 10, color: "gray" }}>
        Home
      </Text>
      <TextInputCustom
        label="Service ID"
        settingKey="serviceId"
        hidden={false}
      />
      <TextInputCustom
        label="Secret Key"
        settingKey="secretKey"
        hidden={true}
      />

      <View style={[{ flexDirection: "row", marginVertical: 10 }]}>
        <View style={[{ flex: 1 }]}>
          <CustomSwitch
            label="Use Prefix?"
            settingKey="usePrefix"
            marginBetween={10}
          />
        </View>
        <View style={[{ flex: 1 }]}>
          <DropDownCustom
            label="Length"
            settingKey="length"
            options={[32, 20, 12, 8]}
          />
        </View>
      </View>
      <View
        style={{
          paddingVertical: "5%",
          justifyContent: "center",
        }}
      >
        <Button
          mode="contained"
          uppercase={false}
          onPress={() => navigation.navigate("Countdown")}
          contentStyle={{ paddingVertical: "3%" }}
          labelStyle={{
            fontSize: 40,
            width: "80%",
          }}
        >
          Generate
        </Button>
      </View>
    </View>
  );
}
