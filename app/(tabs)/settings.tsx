import {Alert, Linking, StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {router, Stack} from "expo-router";
import {MaterialIcons} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";

type Props = {}

const Page = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const GITHUB_USERNAME = "https://github.com/KavinduSenesh/react-native-news-app";

  const handleAbout = () => {
    Linking.openURL(`https://github.com/${GITHUB_USERNAME}`)
        .catch(() => {
          Alert.alert('Error', 'Could not open GitHub profile');
        });
  };

  const handleFeedback = () => {
    Linking.openURL(`https://github.com/${GITHUB_USERNAME}/appname/issues/new`)
        .catch(() => {
          Alert.alert('Error', 'Could not open GitHub issues');
        });
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL(`https://github.com/${GITHUB_USERNAME}/appname/blob/main/PRIVACY.md`)
        .catch(() => {
          Alert.alert('Error', 'Could not open privacy policy');
        });
  };

  const handleTermsOfUse = () => {
    Linking.openURL(`https://github.com/${GITHUB_USERNAME}/appname/blob/main/TERMS.md`)
        .catch(() => {
          Alert.alert('Error', 'Could not open terms of use');
        });
  };

  // const handleLogout = () => {
  //   Alert.alert(
  //       'Logout',
  //       'Are you sure you want to logout?',
  //       [
  //         {
  //           text: 'Cancel',
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'Logout',
  //           style: 'destructive',
  //           onPress: () => {
  //             router.replace('/app/index.tsx');
  //           },
  //         },
  //       ],
  //       {cancelable: true},
  //   );
  // };

  return (
      <>
        <Stack.Screen options={{
          headerShown: true,
          headerTitleAlign: 'center',
        }}/>

          <View style={styles.container}>
            <TouchableOpacity style={styles.itemBtn} onPress={handleAbout}>
              <Text style={styles.itemBtnTxt}>About</Text>
              <MaterialIcons name={"arrow-forward-ios"} size={16} color={Colors.lightGrey}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBtn} onPress={handleFeedback}>
              <Text style={styles.itemBtnTxt}>Send Feedback</Text>
              <MaterialIcons name={"arrow-forward-ios"} size={16} color={Colors.lightGrey}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBtn} onPress={handlePrivacyPolicy}>
              <Text style={styles.itemBtnTxt}>Privacy Policy</Text>
              <MaterialIcons name={"arrow-forward-ios"} size={16} color={Colors.lightGrey}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBtn} onPress={handleTermsOfUse}>
              <Text style={styles.itemBtnTxt}>Terms of Use</Text>
              <MaterialIcons name={"arrow-forward-ios"} size={16} color={Colors.lightGrey}/>
            </TouchableOpacity>
            {/*<TouchableOpacity style={styles.itemBtn} onPress={toggleSwitch}>*/}
            {/*  <View style={styles.darkModeContainer}>*/}
            {/*    <Text style={styles.itemBtnTxt}>Dark Mode</Text>*/}
            {/*    <Switch*/}
            {/*        trackColor={{ false: '#767577', true: '#3e3e3e'}}*/}
            {/*        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}*/}
            {/*        ios_backgroundColor={'#3e3e3e'}*/}
            {/*        onValueChange={toggleSwitch}*/}
            {/*        value={isEnabled}*/}
            {/*        style={styles.switch}*/}
            {/*    />*/}
            {/*  </View>*/}
            {/*  </TouchableOpacity>*/}
            {/*  <TouchableOpacity style={styles.itemBtn} onPress={handleLogout}>*/}
            {/*    <Text style={[styles.itemBtnTxt, {color: 'red'}]}>Logout</Text>*/}
            {/*    <MaterialIcons name={"logout"} size={16} color={'red'}/>*/}
            {/*  </TouchableOpacity>*/}
          </View>
      </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomColor: Colors.background,
    borderBottomWidth: 1,
  },
  itemBtnTxt: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black
  },
  darkModeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }], // More subtle scaling
    marginRight: -8,
  }
})
