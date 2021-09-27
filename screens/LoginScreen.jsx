import React, { useState } from "react";
import {
	StyleSheet,
	Button,
	View,
	TextInput,
	Text,
	Image,
	Keyboard,
	TouchableWithoutFeedback,
	Alert,
} from "react-native";

import Theme from "../constants/constants";

import Soft from "../components/Soft";
import { useFonts } from "@expo-google-fonts/raleway";
import * as SecureStore from "expo-secure-store";
import UserDetail from "./UserDetailScreen";

const Login = (props, { navigation }) => {
	let [fontLoaded] = useFonts({
		El: require("../assets/fonts/ElMessiri-VariableFont_wght.ttf"),
		Gem: require("../assets/fonts/GemunuLibre-VariableFont_wght.ttf"),
	});

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const inputEmailHandler = (enteredEmail) => {
		setEmail(enteredEmail);
	};
	const inputPasswordHandler = (enteredPassword) => {
		setPassword(enteredPassword);
	};
	const notRegistered = () => {
		props.navigation.navigate("Register");
	};

	const loginUrl =
		"https://ecomm-store-proj.herokuapp.com/api/v1/account/login";

	var data;
	const performLogin = async () => {
		const details = { email, password };
		const response = await fetch(loginUrl, {
			method: "POST",
			body: JSON.stringify(details),
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
			},
		});

		var data = await response.json();
		if (data.access) {
			let token = data.access;
			await SecureStore.setItemAsync("token", token);
		} else {
			await SecureStore.setItemAsync("token", data.error);
		}

		props.navigation.navigate("UserDetail");
	};

	const toProducts = () => {
		props.navigation.navigate("Products");
	};

	if (!fontLoaded) {
		return null;
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.login}>
				<Text style={{ fontSize: 20, fontFamily: Theme.font }}>
					Login to your Account{" "}
				</Text>

				<Image
					style={styles.loginVector}
					source={require("../assets/login.jpg")}
				/>

				<Soft style={styles.inputArea}>
					<TextInput
						style={styles.textInput}
						placeholder="Email"
						onChangeText={inputEmailHandler}
						value={email}
					/>
				</Soft>

				<Soft style={styles.inputArea}>
					<TextInput
						style={styles.textInput}
						placeholder="Password"
						onChangeText={inputPasswordHandler}
						value={password}
					/>
				</Soft>

				<Button title="Login" color={Theme.primary} onPress={performLogin} />
				<View style={styles.toRegister}>
					<Text style={{ fontSize: 20, fontFamily: Theme.font }}>
						{" "}
						Don't have an account?{" "}
					</Text>
					<Text
						style={{
							color: Theme.primary,
							fontSize: 20,
							fontFamily: Theme.font,
						}}
						onPress={notRegistered}
					>
						SignUp
					</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	login: {
		flex: 1,
		width: "90%",
		margin: 10,
		alignItems: "center",
		// backgroundColor: 'blue',
	},

	inputArea: {
		height: 45,
		width: "100%",
		paddingLeft: 20,
		alignItems: "flex-start",
	},
	textInput: {
		width: "100%",
		fontSize: 15,
	},
	loginVector: {
		width: 300,
		height: 300,
	},
	toRegister: {
		padding: 20,
		flexDirection: "row",
	},
});

export default Login;
