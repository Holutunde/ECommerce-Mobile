import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Button,
	View,
	TextInput,
	Text,
	Image,
	TouchableWithoutFeedback,
	Keyboard,
	Picker,
} from "react-native";

import Theme from "../constants/constants";
import Soft from "../components/Soft";
import { AppLoading } from "expo-app-loading";
import { useFonts } from "expo-font";
// import {useFonts,} from "@expo-google-fonts/raleway";
import Header from "../components/Header";

const Register = (props, { navigation }) => {
	const [fontLoaded, error] = useFonts({
		Gem: require("../assets/fonts/GemunuLibre-VariableFont_wght.ttf"),
		Itl: require("../assets/fonts/Italianno-Regular.ttf"),
		El: require("../assets/fonts/ElMessiri-VariableFont_wght.ttf"),
	});

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [gender, setGender] = useState("");

	const inputEmailHandler = (enteredEmail) => {
		setEmail(enteredEmail);
	};
	const inputPasswordHandler = (enteredPassword) => {
		setPassword(enteredPassword);
	};
	const inputUsernameHandler = (enteredUsername) => {
		setUsername(enteredUsername);
	};
	const inputGenderHandler = (enteredGender) => {
		setGender(enteredGender);
	};

	const signupUrl =
		"https://ecomm-store-proj.herokuapp.com/api/v1/account/signup";
	const performSignup = async () => {
		const details = { email, password,username,gender };

		const response = await fetch(signupUrl, {
			method: "POST",
			body: JSON.stringify(details),
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
			},
		});

		const data = await response.json();
		console.log(data);
		// history.push("/");
		props.navigation.navigate("Login");
	};

	const alreadyRegistered = () => {
		props.navigation.navigate("Login");
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			{/* <Header /> */}
			<View style={styles.register}>
				<Text style={{ fontSize: 20, fontFamily: Theme.font }}>
					Create A New Account{" "}
				</Text>

				<Image
					style={styles.registerVector}
					source={require("../assets/register.jpg")}
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
						placeholder="Username"
						onChangeText={inputUsernameHandler}
						value={username}
					/>
				</Soft>
				<Soft style={styles.inputArea}>
					<TextInput
						style={styles.textInput}
						placeholder="Gender"
						onChangeText={inputGenderHandler}
						value={gender}
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
				<Button
					style={styles.button}
					title="Register"
					color="#529ae4"
					onPress={performSignup}
				/>
				<View style={styles.toLogin}>
					<Text
						style={{
							// color: Theme.primary,
							fontSize: 20,
							fontFamily: Theme.font,
						}}
					>
						Already have an account?
					</Text>
					<Text
						style={{
							color: Theme.primary,
							fontSize: 20,
							fontFamily: Theme.font,
						}}
						onPress={alreadyRegistered}
					>
						Login
					</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	register: {
		flex: 1,
		width: "90%",
		margin: 10,
		// justifyContent: "center",
		alignItems: "center",
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
	registerVector: {
		width: 300,
		height: 300,
	},

	toLogin: {
		padding: 20,
		flexDirection: "row",
	},
	button: {
		marginTop: 10,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "#00BCD4",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#fff",
	},
});

export default Register;
