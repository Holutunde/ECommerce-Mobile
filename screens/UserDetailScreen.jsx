import React, { useState, useEffect } from "react";
import { StyleSheet, Button, View, Text, Alert } from "react-native";
import { useFonts } from "@expo-google-fonts/raleway";
import Theme from "../constants/constants";
import * as SecureStore from "expo-secure-store";
import Soft from "../components/Soft";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserDetail = (props, { navigation }) => {
	let [loginData, setLoginData] = useState({});
	const [updated, setUpdated] = useState(false);
	const [user, setUser] = useState({ user_info: [], isLoading: false });

	const userInfourl = "https://ecomm-store-proj.herokuapp.com/api/v1/user";

	const [fontLoaded, error] = useFonts({
		Gem: require("../assets/fonts/GemunuLibre-VariableFont_wght.ttf"),
		Itl: require("../assets/fonts/Italianno-Regular.ttf"),
		El: require("../assets/fonts/ElMessiri-VariableFont_wght.ttf"),
	});

	const backToLogin = () => {
		props.navigation.navigate("Login");
	};

	async function getStorageValue(key, defaultValue) {
		let value = defaultValue;
		try {
			const getToken = await AsyncStorage.getItem(key);
			value = JSON.parse(getToken) || defaultValue;
		} catch (e) {
			alert(e);
		} finally {
			if (value.success == false) {
				Alert.alert("Invalid Details", loginData.error, [
					{
						text: "Cancel",
						style: "default",
						onPress: backToLogin,
					},
				]);
				return;
			} else {
				setLoginData(value);
				setUpdated(true);
				getUser(loginData.access);
			}
		}
	}

	async function getUser(token) {
		let user = { user_info: 'Empty', isLoading: 'false' }
		try {
			setUser({ user_info: [], isLoading: true });
			const response = await fetch(userInfourl, {
				method: "GET",
				headers: {
					"Content-type": "application/json",
					Accept: "application/json",
					Authorization: "Bearer " + token,
				},
			});
			const data = await response.json();
		} catch (error) {
			alert(error);
		} finally {
			setUser({ user_info: data.results, isLoading: false });
		}
	}

	useEffect(() => {
		getStorageValue("loginInfo", "Empty");
	}, []);
	
	return (
		<View style={styles.screen}>
			<Soft style={styles.cardArea}>
				<Text style={styles.text2}> ₦{"Hello"} </Text>
				<Text style={styles.text2}> ₦{ user.user_info[0].email } </Text>	
			</Soft>
		</View>
	);
};

const styles = StyleSheet.create({
	login: {
		flex: 1,
		width: "90%",
		margin: 10,
		alignItems: "center",
		justifyContent: "center",

		// backgroundColor: 'blue',
	},

	text: {
		fontSize: 20,
		fontFamily: Theme.font,
	},
	text2: {
		fontSize: 20,
		fontFamily: Theme.font,
	},
	cardArea: {
		width: "90%",
		padding: 20,
		alignItems: "flex-start",
	},
	loginVector: {
		width: 150,
		height: 150,
	},
	toRegister: {
		padding: 20,
		flexDirection: "row",
	},
	img: {
		width: 86,
		height: 78,
	},
});

export default UserDetail;
