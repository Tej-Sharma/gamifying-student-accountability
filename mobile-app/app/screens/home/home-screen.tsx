import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "../../navigators"
import { GradientBackground, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { AddIcon, Box, Button, Fab, VStack } from "native-base"
import firestore from "@react-native-firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TouchableOpacity } from "react-native-gesture-handler"

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
  color: 'grey',
  fontSize: 26,
  lineHeight: 28,
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

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  function HomeScreen() {
    const [groups, setGroups] = useState([])

    useEffect(() => {
      // Get groups
      const db = firestore()

      const getUserPhone = async () => {
        let result = await AsyncStorage.getItem('currentUserPhone')
        return result;
      }
      getUserPhone().then(currentUserPhone => { 
        // Check if in dev mode
        if(!currentUserPhone) { 
          currentUserPhone = '4845579287';
          AsyncStorage.setItem('currentUserPhone', '4845579287');
        }
        db.collection('users')
        .doc(currentUserPhone).collection('groups')
        .get()
        .then((querySnapshot) => {
          const tempGroups = []
          querySnapshot.forEach((doc) => {
            tempGroups.push(doc.data())
          })
          setGroups(tempGroups);
          console.log('Groups retrieved!');
          console.log(tempGroups);
        })
        .catch((err) => {
          console.log(err);
        })
      });
        
    }, [])


    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#d4d4d4"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Text style={TITLE}>Your Groups</Text>
          {groups.length === 0 && (
            <View style={TITLE}>
              <Text style={{ color: "grey" }}>Welcome to the app!</Text>
              <Text style={{ color: "grey" }}>To get started, add a group.</Text>
            </View>
          )}
          <VStack>
            {groups.map((group, index) => (
              <View key={index}>
                  <Button
                    style={{
                      borderWidth: 2,
                      borderRadius: 2,
                      backgroundColor: '#ebebeb',
                      borderColor: "#963cc7",
                      marginTop: spacing[5],
                    }}
                    p="3"
                    rounded="lg"
                    _text={{ fontSize: "lg", fontWeight: "bold", color: "grey", textAlign: 'left' }}
                    onPress={() => {navigate("groupCheck", { groupData: group })}}
                  >
                    {group.groupName}
                  </Button>
              </View>
            ))}
          </VStack>
        </Screen>
        <Fab
          renderInPortal={false}
          shadow={2}
          size="lg"
          icon={<AddIcon color="white" name="plus" size="sm" />}
          right={25}
          bottom={25}
          backgroundColor="#5065A8"
          onPress={() => navigate("createGroup")}
        />
      </View>
    )
  },
)
