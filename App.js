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
import { useFonts } from "expo-font";
import UserDetail from "./screens/UserDetailScreen";
import SplashScreen from "./screens/SplashScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	const MyTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: "#FFFF",
		},
	};

	const [fontLoaded, error] = useFonts({
		Gem: require("./assets/fonts/GemunuLibre-VariableFont_wght.ttf"),
	});

	return (
		<NavigationContainer theme={MyTheme}>
			<StatusBar style="auto" />
			<Stack.Navigator 
			screenOptions={{
               headerShown: false
             }}>
				<Stack.Screen name="Splash" component={SplashScreen}/>	
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Register" component={Register}/>
				<Stack.Screen name="UserDetail" component={UserDetail} />
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
