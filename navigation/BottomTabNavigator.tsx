import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabWalletScreen from "../screens/TabWalletScreen";
import TabSendScreen from "../screens/TabSendScreen";
import TabReceiveScreen from "../screens/TabReceiveScreen";
import TabStakingScreen from "../screens/TabStakingScreen";
import {
  BottomTabParamList,
  TabWalletParamList,
  TabSendParamList,
  TabReceiveParamList,
  TabStakingParamList,
  TabFiveParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Wallet"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Wallet"
        component={TabWalletNavigator}
        options={{
          title: "Баланс",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-wallet" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Send"
        component={TabSendNavigator}
        options={{
          title: "Отправить",
          tabBarIcon: ({ color }) => <TabBarIcon name="exit" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Receive"
        component={TabReceiveNavigator}
        options={{
          title: "Получить",
          tabBarIcon: ({ color }) => <TabBarIcon name="enter" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Staking"
        component={TabStakingNavigator}
        options={{
          title: "Стейкинг",
          tabBarIcon: ({ color }) => <TabBarIcon name="rocket" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabWalletStack = createStackNavigator<TabWalletParamList>();

function TabWalletNavigator() {
  return (
    <TabWalletStack.Navigator>
      <TabWalletStack.Screen
        name="TabWalletScreen"
        component={TabWalletScreen}
        options={{ headerTitle: "БАЛАНС" }}
      />
    </TabWalletStack.Navigator>
  );
}

const TabSendStack = createStackNavigator<TabSendParamList>();

function TabSendNavigator() {
  return (
    <TabSendStack.Navigator>
      <TabSendStack.Screen
        name="TabSendScreen"
        component={TabSendScreen}
        options={{ headerTitle: "ОТПРАВИТЬ" }}
      />
    </TabSendStack.Navigator>
  );
}

const TabReceiveStack = createStackNavigator<TabReceiveParamList>();

function TabReceiveNavigator() {
  return (
    <TabReceiveStack.Navigator>
      <TabReceiveStack.Screen
        name="TabReceiveScreen"
        component={TabReceiveScreen}
        options={{ headerTitle: "ПОЛУЧИТЬ" }}
      />
    </TabReceiveStack.Navigator>
  );
}

const TabStakingStack = createStackNavigator<TabStakingParamList>();

function TabStakingNavigator() {
  return (
    <TabStakingStack.Navigator>
      <TabStakingStack.Screen
        name="TabStakingScreen"
        component={TabStakingScreen}
        options={{ headerTitle: "СТЕЙКИНГ" }}
      />
    </TabStakingStack.Navigator>
  );
}

// const TabFiveStack = createStackNavigator<TabFiveParamList>();

// function TabFiveNavigator() {
//   return (
//     <TabFiveStack.Navigator>
//       <TabFiveStack.Screen
//         name="TabFiveScreen"
//         component={TabFiveScreen}
//         options={{ headerTitle: "ОБРАЩЕНИЯ" }}
//       />
//     </TabFiveStack.Navigator>
//   );
// }
