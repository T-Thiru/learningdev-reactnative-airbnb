import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import SplashScreen from "./containers/SplashScreen";
import ArrounMeScreen from "./containers/ArrounMeScreen";
import { Entypo } from "@expo/vector-icons";
import RoomScreen from "./containers/RoomScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const UserContext = createContext({});

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState();

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />;
  }

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user }}>
        <Stack.Navigator>
          {userToken === null ? (
            // No token found, user isn't signed in
            <>
              <Stack.Screen name="SignIn">
                {() => <SignInScreen setToken={setToken} setUser={setUser} />}
              </Stack.Screen>
              <Stack.Screen name="SignUp">
                {() => <SignUpScreen setToken={setToken} setUser={setUser} />}
              </Stack.Screen>
            </>
          ) : (
            // User is signed in ! 🎉
            <Stack.Screen name="Tab" options={{ headerShown: false }}>
              {() => (
                <Tab.Navigator
                  screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "tomato",
                    tabBarInactiveTintColor: "gray",
                  }}
                >
                  <Tab.Screen
                    name="TabHome"
                    options={{
                      tabBarLabel: "Home",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name={"ios-home"} size={size} color={color} />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Home"
                          options={{
                            title: "HOME",
                            headerStyle: { backgroundColor: "red" },
                            headerTitleStyle: { color: "white" },
                          }}
                        >
                          {() => <HomeScreen user={user} />}
                        </Stack.Screen>
                        <Stack.Screen
                          name="Room"
                          options={{
                            title: "Room",
                            headerStyle: { backgroundColor: "red" },
                            headerTitleStyle: { color: "white" },
                          }}
                        >
                          {() => <RoomScreen />}
                        </Stack.Screen>

                        <Stack.Screen
                          name="Profile"
                          options={{
                            title: "User Profile",
                          }}
                        >
                          {() => <ProfileScreen user={user} />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name="ArroundME"
                    options={{
                      tabBarLabel: "Arround Me",
                      tabBarIcon: ({ color, size }) => (
                        <Entypo name="location" size={24} color="red" />
                      ),
                    }}
                  >
                    {() => <ArrounMeScreen />}
                  </Tab.Screen>
                  <Tab.Screen
                    name="TabSettings"
                    options={{
                      tabBarLabel: "Settings",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons
                          name={"ios-options"}
                          size={size}
                          color={color}
                        />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Settings"
                          options={{
                            title: "Settings",
                          }}
                        >
                          {() => (
                            <SettingsScreen
                              setToken={setToken}
                              setUser={setUser}
                            />
                          )}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                </Tab.Navigator>
              )}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}
