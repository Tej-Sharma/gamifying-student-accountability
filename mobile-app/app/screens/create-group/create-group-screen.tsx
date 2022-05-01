import React, { FC, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "../../navigators"
import { Button, GradientBackground, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { AddIcon, Box, Fab, TextArea } from "native-base"
import MultiSelect from "react-native-multiple-select"
import constants from "../../utils/constants"

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
  color: color.palette.white,
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
  color: "#BAB6C8",
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
const FOOTER: ViewStyle = {}
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

const TEXT_AREA: ViewStyle = {
  marginTop: spacing[4],
  marginBottom: spacing[4],
}
// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `home: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="home" component={HomeScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const CreateGroupScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  function HomeScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const [selectedItems, setSelectedItems] = useState([])
    const [phoneNumbersText, setPhoneNumbersText] = useState("")
    const selectTasksRef = useRef(null)

    const createGroup = () => {
      let phoneNumbers = phoneNumbersText.split(/\r?\n/);
      console.log(selectedItems)
    }

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#d4d4d4"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <TextArea
            h={100}
            placeholder="Add friend's phone number on each line..."
            style={TEXT_AREA}
            onChangeText={(text) => setPhoneNumbersText(text)}
          />

          <Box style={{ marginTop: spacing[4] }}>
            <MultiSelect
              hideTags
              items={constants.habits}
              uniqueKey="id"
              ref={selectTasksRef}
              onSelectedItemsChange={(e) => setSelectedItems(e)}
              selectedItems={selectedItems}
              selectText="Pick tasks"
              searchInputPlaceholderText="Add daily tasks..."
              onChangeInput={(text) => console.log(text)}
              altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: "#CCC" }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
            <View>
              {selectTasksRef.current && selectTasksRef.current.getSelectedItemsExt(selectedItems)}
            </View>

            <Text style={{ color: "grey", marginTop: spacing[4] }}>Daily check-in will be at 10pm.</Text>
          </Box>
        </Screen>
        <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}>
            <Button
              testID="next-screen-button"
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              text="Create Group"
              onPress={createGroup}
            />
          </View>
        </SafeAreaView>
      </View>
    )
  },
)
