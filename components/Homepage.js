import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Button, Image, TouchableOpacity } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';

import {getItemFromAsyncStorage, mergeItemInAsyncStorage, storeItemToAsyncStorage} from './AsyncStorageMethods'

export default function Homepage({ userData, setUser}) {
    const [displayingUsers, setDisplayingUsers] = useState([]);
    /// main navigation usage
    const navigation = useNavigation();
    useEffect(() => {
      if (userData) {
        setDisplayingUsers([...userData.slice(0, 8)]);
      }
    }, [userData]);

    function loadAllUsers() {
      setDisplayingUsers([...userData]);
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.center}>
              <View style={styles.homeView}>
                <Text style={styles.montseratFont}>
                  MB testing
                </Text>
                <View style={styles.list}>
                  {displayingUsers.map(user => (
                    <View 
                      style={styles.item}
                      key={user.name}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          const userArrayData = 
                            {
                                _id: user._id,
                                email: user.email,
                                name: user.name,
                                emailNotifications: user.emailNotifications,
                                appNotifications: user.appNotifications,
                                secret: user.secret,
                                userAvatar: user.userAvatar,
                            };
                          storeItemToAsyncStorage("user", userArrayData);
                          setUser(user);
                          alert('This user was saved to account page');
                        }}
                      >
                      <Image 
                        source={{uri: user.userAvatar}}
                        style={{width: 50, height: 50}}
                      />
                      </TouchableOpacity>
                      <View 
                        style={{
                          marginLeft: 4
                        }}
                      >
                        <Text 
                          style={{
                            fontWeight: 'bold'
                          }}
                        >
                          {user.name}
                        </Text>
                        <Text>
                          {user.email}
                        </Text>
                      </View>
                    </View>
                  ))}
                  {displayingUsers.length !== userData.length ? (
                    <Button 
                      title="Load more"
                      onPress={() => {
                        loadAllUsers();
                      }}
                    />
                  ) : (
                    undefined
                  )}
                </View>
              </View>
            </View>
        </ScrollView>
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
    homeView: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    montseratFont: {
      fontFamily: 'Montserrat-Regular',
      color: 'teal',
      marginLeft: 5
    },
    list: {
     marginTop: 30,
     flex: 1,
     alignItems: 'flex-start',
     justifyContent: 'flex-start',
     padding: 1,
     marginBottom: 40
    },
    item: {
      flex: 1,
      flexDirection: 'row',
      paddingBottom: 8
    }
});