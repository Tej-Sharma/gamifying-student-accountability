import React, { FC, useState } from "react"
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import firestore from "@react-native-firebase/firestore"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  GradientBackground,
  AutoImage as Image,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { navigate, NavigatorParamList } from "../../navigators"
import { Box, Icon, Input } from "native-base"
import AsyncStorage from '@react-native-async-storage/async-storage';

const bowserLogo = require("./bowser.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[6],
}
const TEXT: TextStyle = {
  color: "grey",
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  maxWidth: "100%",
  width: 353,
  height: 350,
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "grey",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
  textAlign: "center",
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: 'white',
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState("")

    const onboardUser = () => {
      const userData = {
        name,
        phoneNumber,
      }

      const db = firestore()

      db.collection("users")
        .doc(phoneNumber)
        .set(userData)
        .then(() => {
          AsyncStorage.setItem('currentUserPhone', phoneNumber).then(() => {
            navigation.navigate("home")
          }).catch((error) => {
            console.log(error);
          })
        })
        .catch((error) => {
          console.log(error);
        })
    }

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#d4d4d4"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Text style={TITLE_WRAPPER}>
            <Text style={TITLE} text="Gamified Accountability" />
          </Text>
          <Image source={bowserLogo} style={BOWSER} />
          <Text style={CONTENT}>Student accountability so the whole gang grows together</Text>
          <Input
            size="lg"
            placeholder="Name"
            onChangeText={(val) => setName(val)}
            style={{ color: "#c4c4c4" }}
          />
          <Box style={{marginTop: spacing[4]}}>
            <Input
              size="lg"
              placeholder="(xxx)-xxx-xxxx"
              onChangeText={(val) => setPhoneNumber(val)}
              style={{ color: "#c4c4c4" }}
            />
          </Box>
        </Screen>
        <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}>
            <Button
              testID="next-screen-button"
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              tx="welcomeScreen.continue"
              onPress={onboardUser}
            />
          </View>
        </SafeAreaView>
      </View>
    )
  },
)
