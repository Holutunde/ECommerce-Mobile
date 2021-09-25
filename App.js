import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Header from "./components/Header";
import Search from "./components/Search";
import Login from "./screens/LoginScreen";
import Register from "./screens/RegisterScreen";
import Theme from "./constants/constants";
// import MyStack from './screens/Stack';
import AllProducts from "./screens/ProductsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	const MyTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: "#FFFF",
		},
	};
	return (
		<NavigationContainer theme={MyTheme}>
			<StatusBar style="auto" />
			<Header />
			<Stack.Navigator screenOptions={{ header: () => null }}>
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Products" component={AllProducts} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "blue",
	},
});
