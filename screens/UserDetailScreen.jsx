import React, { useState, useEffect } from "react";
import { StyleSheet, Button, View, Text, Alert } from "react-native";
import { useFonts } from "@expo-google-fonts/raleway";
import Theme from "../constants/constants";
import * as SecureStore from "expo-secure-store";
import Soft from "../components/Soft";

const UserDetail = (props, { navigation }) => {
	const [loginToken, setLoginToken] = useState("Empty");
	const [user, setUser] = useState({ user_info: [], isLoading: false });

	const userInfourl =
		"https://ecomm-store-proj.herokuapp.com/api/v1/account/user";

	const [fontLoaded, error] = useFonts({
		Gem: require("../assets/fonts/GemunuLibre-VariableFont_wght.ttf"),
		Itl: require("../assets/fonts/Italianno-Regular.ttf"),
		El: require("../assets/fonts/ElMessiri-VariableFont_wght.ttf"),
	});

	const backToLogin = () => {
		props.navigation.navigate("Login");
	};

	useEffect(() => {
		validateToken();
		console.log("USESTATE CALLED");
	}, []);

	const validateToken = () => {
		let token = SecureStore.getItemAsync("token");
		console.log(token);
		if (token.length == 255) {
			console.log(`Saved ${token}`);
			setLoginToken(token);
			getUser();
		} else {
			console.log(`Not saved ${token}`);
			Alert.alert("Invalid", "Invalid Email or Password", [
				{
					text: "Cancel",
					style: "default",
					onPress: backToLogin,
				},
			]);
			return;
		}
	};

	const getUser = async () => {
		setUser({ user_info: [], isLoading: true });
		const response = await fetch(userInfourl, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
				Authorization: "Bearer " + loginToken,
			},
		});
		const data = await response.json();
		console.log(data);
		setUser({ user_info: data.results, isLoading: false });
	};

	if (user.isLoading) {
		return <Text>Loading...</Text>;
	}

	if (user.user_info == undefined) {
		Alert.alert(loginToken, loginToken, [
			{
				text: "Cancel",
				style: "default",
				onPress: props.navigation.navigate("Login"),
			},
		]);
		return;
	}

	return (
		<View style={styles.screen}>
			<Soft style={styles.cardArea}>
				{/* <Image style={styles.img} source={{ uri: all_items.username }} /> */}
				{console.log(loginToken)}
				<Text style={styles.text2}> {user.user_info[0].email} </Text>
				<Text style={styles.text2}> ₦{user.user_info[0].username} </Text>
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
