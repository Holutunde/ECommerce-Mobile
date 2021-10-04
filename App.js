import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createDrawerNavigator } from "@react-navigation/drawer";

import Header from "./components/Header";
import Search from "./components/Search";
import Login from "./screens/LoginScreen";
import Register from "./screens/RegisterScreen";
import Theme from "./constants/constants";
import AllProducts from "./screens/ProductsScreen";
import { useFonts } from "expo-font";
import UserDetail from "./screens/UserDetailScreen";
import SplashScreen from "./screens/SplashScreen";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
	const MyTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: "#FFFF",
		},
	};

	const [loading, setLoading] = React.useState(false);
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);

	const [fontLoaded, error] = useFonts({
		Gem: require("./assets/fonts/GemunuLibre-VariableFont_wght.ttf"),
	});

	const refreshAccessToken = () => {
		
	}

	React.useEffect(() => {
		const checkAccessToken = async () => {
			setLoading(true);
			const data = await AsyncStorage.getItem("loginInfo");
			console.log(data)
			if (data == null) {
				setIsLoggedIn(false);
				setLoading(false);
			} else {
				setLoading(false);
				setIsLoggedIn(true);
			}
		};
		checkAccessToken();
		setLoading(false);
	}, []);

	if (loading == true) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color={Theme.primary} />
			</View>
		);
	}

	return (
		<NavigationContainer theme={MyTheme}>
			<StatusBar style="auto" />
			{isLoggedIn != true ? (
				<AuthStack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					<AuthStack.Screen name="Splash" component={SplashScreen} />
					<AuthStack.Screen name="Login" component={Login} />
					<AuthStack.Screen name="Register" component={Register} />
					<AuthStack.Screen name="UserDetail" component={UserDetail} />
					<AuthStack.Screen name="Products" component={AllProducts} />
				</AuthStack.Navigator>
			) : (
				<AuthStack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					<AuthStack.Screen name="UserDetail" component={UserDetail} />
				</AuthStack.Navigator>
			)}
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "blue",
	},
});
