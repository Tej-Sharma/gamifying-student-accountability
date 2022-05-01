import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "../../navigators"
import { Button, Checkbox, GradientBackground, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { AddIcon, Box, Fab, HStack, Input, TextArea, VStack } from "native-base"
import MultiSelect from "react-native-multiple-select"
import constants from "../../utils/constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
import uuid from "react-native-uuid"
import firestore from "@react-native-firebase/firestore"
import { useRoute } from "@react-navigation/native"

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
  color: 'grey',
  fontSize: 22,
  lineHeight: 22,
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
  color: "#9e9e9e",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
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
export const GroupCheckScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  function HomeScreen() {
    const [groupName, setGroupName] = useState("")
    const [selectedItems, setSelectedItems] = useState([])
    const [phoneNumbersText, setPhoneNumbersText] = useState("")
    const selectTasksRef = useRef(null)

    const route = useRoute()
    const { groupData } = route.params

    const [completedTasks, setCompletedTasks] = useState([]);


    const sendGroupUpdate =  () => {
    
    }

    const handleCheckBox = (task, val) => {

    }

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#d4d4d4"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Text style={TITLE}>Daily check for {groupData.groupName}</Text>
          <Box style={{ marginTop: spacing[4] }}>
          <Text style={CONTENT}>Honor system here, be honest!</Text>
          </Box>
          <VStack style={{ marginTop: spacing[4] }}>
            {groupData.groupTasks.map((task, index) => (
              <HStack key={task} justifyContent="space-between">
                <Text style={{color: '#8c8c8c'}}>{constants.habitsMap[task]}</Text>
                <Checkbox value={completedTasks.includes(task)} onToggle={(e) => handleCheckBox(task, e)} />
              </HStack>
            ))}
          </VStack>

          <Box style={{ marginTop: spacing[4] }}>
            
          </Box>
        </Screen>
        <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}>
            <Button
              testID="next-screen-button"
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              text="Send Group Update"
            />
          </View>
        </SafeAreaView>
      </View>
    )
  },
)
