import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "../../navigators"
import { GradientBackground, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { AddIcon, Fab } from "native-base"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

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
  marginVertical: spacing[5],
  maxWidth: "100%",
  width: 343,
  height: 230,
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
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `home: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="home" component={HomeScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  function HomeScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const [groups, setGroups] = useState([])

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#d4d4d4"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          {groups.length === 0 && (
            <View style={TITLE}>
              <Text style={{ color: "grey" }}>Welcome to the app!</Text>
              <Text style={{ color: "grey" }}>To get started, add a group.</Text>
            </View>
          )}
        </Screen>
        <Fab
          renderInPortal={false}
          shadow={2}
          size="sm"
          icon={<AddIcon color="white" name="plus" size="sm" />}
          right={25}
          bottom={25}
          backgroundColor="#963cc7"
          onPress={() => navigate("createGroup")}
        />
      </View>
    )
  },
)
