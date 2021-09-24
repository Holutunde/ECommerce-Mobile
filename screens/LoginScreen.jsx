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
} from "react-native";
import Theme from "../constants/constants";
import Header from "../components/Header";

import Soft from "../components/Soft";
import { AppLoading } from "expo";
import {
	useFonts,
	Raleway_200ExtraLight,
	Raleway_100Thin,
	Raleway_400Regular,
	Raleway_500Medium,
} from "@expo-google-fonts/raleway";

const Login = (props, { navigation }) => {
	let [fontLoaded, error] = useFonts({
		Raleway_200ExtraLight,
		Raleway_100Thin,
		Raleway_400Regular,
		Raleway_500Medium,
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
	const performLogin = () => {
		let loginData = [
			{
				user_email: email,
				user_password: password,
			},
		];
		return (
		console.log(loginData[0])
		);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.login}>
				<Text style={styles.text}> Login to your Account </Text>

				<Image
					style={styles.loginVector}
					source={require("../assets/login.jpg")}
				/>

				<Soft style={styles.input}>
					<TextInput
						placeholder="Email"
						onChangeText={inputEmailHandler}
						value={email}
					/>
				</Soft>

				<Soft style={styles.input}>
					<TextInput
						placeholder="Password"
						onChangeText={inputPasswordHandler}
						value={password}
					/>
				</Soft>

				<Button title="Login" color={Theme.primary} onPress={performLogin}/>
				<View style={styles.toRegister}>
					<Text style={styles.text2}> Don't have an account? </Text>
					<Text
						style={{ color: Theme.primary, ...styles.text }}
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

	text: {
		fontSize: 20,
		fontFamily: "Raleway_500Medium",
	},
	text2: {
		fontSize: 20,
		fontFamily: "Raleway_400Regular",
	},
	input: {
		height: 45,
		width: "90%",
		// borderColor: Theme.primary,
		// borderWidth: 0.5,
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
