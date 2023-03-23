import React, { useState, useEffect } from "react";
import { Text, View } from 'react-native';
import { gStyle } from "./Style/style";
import HomepageStack from './navigate';
import { StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import axios from "axios";
//import TabNavigation from './navigate';

import {getItemFromAsyncStorage, storeItemToAsyncStorage} from './components/AsyncStorageMethods'
// export function
export default function App() {
  /// add default constatnts
  /// user sign in trgger
  /// поиграйся с констнтой - поменяй ее по очереди на false и true что бы понять как это устроено
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState();
  useEffect(() => {
    axios.get('https://moduleblocks.net/testing/Users.json')
    .then(response => {
      setUserData(response.data)
    });


  }, []);
  /// trigger changes in userData
  //useEffect(() => {
    /// if changes registered in userData
   //console.log(userData)

  //}, [userData]);
  /// STORE USER TO ASYNC STORAGE EXAMPLE

  // const userArrayData = 
  //   {
  //       _id: userData[0]._id,
  //       email: userData[0].email,
  //       name: userData[0].name,
  //       emailNotifications: userData[0].emailNotifications,
  //       appNotifications: userData[0].appNotifications,
  //       secret: userData[0].secret,
  //       userAvatar: userData[0].userAvatar,
  //   };
    // /// store user to Async Storage                  
    // storeItemToAsyncStorage("user", userArrayData);



  /// on app load check if user exist in asyncStorage
  // GET THE USER ARRAY FROM ASYNC STORAGE EXAMPLE
  const getNewData = async () => {
    const newItem = await getItemFromAsyncStorage('user')
    /// wait until loaded
    //console.log(newItem)
      if(newItem) {
        // set state
        setUser(newItem)
      }
    
  }
  /// hit the function
  useEffect(() => {
    /// call it once by this method
    getNewData();
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  } else {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000)
  }

  return (
    <View style={gStyle.main}>
      <HomepageStack 
        userData={userData} 
        setUserData={setUserData} 
        setUser={setUser} 
        user={user} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fafafa',
      padding: 0,
      paddingTop: 44,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
});
