import React from "react";
import {
	StyleSheet,
	Button,
	View,
	TextInput,
	Text,
	Image,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import Theme from "../constants/constants";
import Soft from "../components/Soft";
import { AppLoading } from "expo";
import {
	useFonts,
	Raleway_200ExtraLight,
	Raleway_100Thin,
	Raleway_400Regular,
	Raleway_500Medium,
} from "@expo-google-fonts/raleway";
import Header from "../components/Header";

const Register = (props,{navigation}) => {
	let [fontLoaded, error] = useFonts({
		Raleway_200ExtraLight,
		Raleway_100Thin,
		Raleway_400Regular,
		Raleway_500Medium,
	});
	const alreadyRegistered = () => {
		props.navigation.navigate('Login');
	}

	const toProducts = () => {
		props.navigation.navigate("Products");
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			{/* <Header /> */}
			<View style={styles.register}>
				<Text style={styles.text1}> Create A New Account </Text>

				<Image
					style={styles.registerVector}
					source={require("../assets/register.jpg")}
				/>
				<Soft style={styles.input}>
					<TextInput placeholder="Full Name" />
				</Soft>
				<Soft style={styles.input}>
					<TextInput placeholder="Email" />
				</Soft>
				<Soft style={styles.input}>
					<TextInput placeholder="Phone Number" />
				</Soft>
				<Soft style={styles.input}>
					<TextInput placeholder="Password" />
				</Soft>
				<Button style={styles.button} title="Register" color="#529ae4" onPress={ toProducts}/>
				<View style={styles.toLogin}>
					<Text style={styles.text2}> Already have an account? </Text>
					<Text
						style={{ color: Theme.primary, ...styles.text1 }}
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

	text1: {
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
