import React, { useState } from "react";
import {
	StyleSheet,
	View,
	TextInput,
	Text,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Alert,
	ScrollView,
	ActivityIndicator,
	TouchableOpacity,
	Platform,
	ToastAndroid,
} from "react-native";


import Theme from "../constants/constants";
import Soft from "../components/Soft";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";
import GoogleAuthButton from "../components/GoogleAuth";
// import {GoogleSigninButton } from "react-native-google-signin";

const Login = (props, { navigation }) => {
	const [loading, setLoading] = useState(false);
	let [fontLoaded] = useFonts({
		El: require("../assets/fonts/ElMessiri-VariableFont_wght.ttf"),
		Gem: require("../assets/fonts/GemunuLibre-VariableFont_wght.ttf"),
	});

	const [isFocused, setFocused] = useState(false);

	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
		check_textInputChange: false,
		secureTextEntry: true,
	});

	const textInputChange = (val) => {
		if (val.length !== 0) {
			setLoginData({
				...loginData,
				email: val,
				check_textInputChange: true,
			});
		} else {
			setLoginData({
				...loginData,
				email: val,
				check_textInputChange: false,
			});
		}
	};

	const handlePasswordChange = (val) => {
		setLoginData({
			...loginData,
			password: val,
		});
	};

	const updateSecureTextEntry = () => {
		setLoginData({
			...loginData,
			secureTextEntry: !loginData.secureTextEntry,
		});
	};

	const notRegistered = () => {
		props.navigation.navigate("Register");
	};

	const Registered = () => {
		props.navigation.navigate("Products");
	};

	const performLogin = async () => {
		const loginUrl =
			"https://ecomm-store-proj.herokuapp.com/api/v1/account/login";
		const email = loginData.email;
		const password = loginData.password;
		const details = { email, password };
		setLoading(true);
		const response = await fetch(loginUrl, {
			method: "POST",
			body: JSON.stringify(details),
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
			},
		});

		const loginRes = await response.json();
		if (loginRes.success != true) {
			ToastAndroid.showWithGravity(
				loginRes.error,
				ToastAndroid.SHORT,
				ToastAndroid.TOP
			);
			setLoading(false);

			return;
		}
		setLoading(false);
		saveToken(loginRes);
		toUserDetail();
	};

	const saveToken = async (loginData) => {
		try {
			const jsonLoginData = JSON.stringify(loginData);
			await AsyncStorage.setItem("loginInfo", jsonLoginData);
		} catch (error) {
			alert(error);
		}
	};

	const handleGoogleSignIn = async () => {
		setLoading(true);
		const config = {
			androidClientId: `341224720546-si07qsfk5m4jji02n3hq1jqkbcfcpds9.apps.googleusercontent.com`,
			// androidClientId: `341224720546-eo0srsqripcjus508s371ajk7peim1u5.apps.googleusercontent.com`,
			scopes: ["email", "profile"],
		};
		// await Google.logInAsync(config)
		// 	.then((result) => { console.log(result) })
		// 	.catch((error) => {
		// 		alert(error)
		// 	})
		const data = await Google.logInAsync(config);

		console.log(data.idToken);
		// const parsedData = JSON.parse(data)
		setLoading(false);
		authWithGoogle(data.idToken);
	};

	const authWithGoogle = async (idToken) => {
		setLoading(true);
		const googleAuthUrl = `https://ecomm-store-proj.herokuapp.com/api/v1/social_auth/google/`;
		const auth_token = idToken;
		const details = { auth_token };
		const response = await fetch(googleAuthUrl, {
			method: "POST",
			body: JSON.stringify(details),
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
			},
		});

		const socialAuthResponse = await response.json();
		console.log("Social Auth Response", socialAuthResponse);
		// if (loginRes.success != true) {
		// 	ToastAndroid.showWithGravity(
		// 		loginRes.error,
		// 		ToastAndroid.SHORT,
		// 		ToastAndroid.TOP
		// 	);
		// 	return;
		// }
		saveToken(socialAuthResponse);
		setLoading(false);
		toUserDetail();
	};

	const toUserDetail = () => {
		props.navigation.navigate("UserDetail");
	};
	if (!fontLoaded) {
		return null;
	}
	if (loading == true) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color={Theme.primary} />
			</View>
		);
	}
	return (
		<View style={styles.content}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : null}
			>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<ScrollView
						style={styles.container}
						contentContainerStyle={{
							alignItems: "center",
							justifyContent: "center",
							flex: 1,
						}}
					>
						<Image
							style={styles.loginVector}
							source={require("../pictures/login.jpg")}
						/>

						<View style={styles.action}>
							<FontAwesome name="user-o" color="#05375a" size={20} />
							<TextInput
								onFocus={() => setFocused(true)}
								placeholder="Email"
								style={styles.textInput}
								autoCapitalize="none"
								onChangeText={(val) => textInputChange(val)}
							/>
							{loginData.check_textInputChange ? (
								<Animatable.View animation="bounceIn">
									<Feather name="check-circle" color="green" size={20} />
								</Animatable.View>
							) : null}
						</View>

						<View style={styles.action}>
							<Feather name="lock" color="#05375a" size={20} />
							<TextInput
								placeholder="********"
								secureTextEntry={loginData.secureTextEntry ? true : false}
								style={styles.textInput}
								autoCapitalize="none"
								onChangeText={(val) => handlePasswordChange(val)}
							/>
							<TouchableOpacity onPress={updateSecureTextEntry}>
								{loginData.secureTextEntry ? (
									<Feather name="eye-off" color="grey" size={20} />
								) : (
									<Feather name="eye" color="grey" size={20} />
								)}
							</TouchableOpacity>
						</View>

						<TouchableOpacity onPress={performLogin} style={styles.signIn}>
							<Text style={styles.textSign}>Log in</Text>
						</TouchableOpacity>

						<GoogleAuthButton googleAuth={handleGoogleSignIn} />

						<View style={styles.toRegister}>
							<Text style={{ fontSize: 20, fontFamily: Theme.font }}>
								Don't have an account?
							</Text>
							<Text
								style={{
									color: Theme.primary,
									fontSize: 20,
									fontFamily: Theme.font,
									paddingLeft: 10,
								}}
								onPress={notRegistered}
							>
								Sign up
							</Text>
						</View>
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
	},
	googleSignIn: {
		width: 200,
		height: 60,
		flexDirection: 'row',
		justifyContent: "space-evenly",
		marginTop: 12,
	},
	container: {
		// backgroundColor: 'red',
		height: "100%",
		width: "100%",
	},
	inputArea: {
		justifyContent: "center",
		height: 45,
		width: "85%",
		marginBottom: 20,
	},
	textInput: {
		width: "100%",
		fontSize: 15,
		paddingStart: 10,
	},
	loginVector: {
		width: 300,
		height: 300,
	},
	toRegister: {
		padding: 20,
		flexDirection: "row",
	},
	signIn: {
		backgroundColor: "#8EA2FF",
		borderWidth: 1,
		width: "90%",
		height: 45,
		marginTop: 20,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	textSign: {
		fontSize: 18,
		fontWeight: "bold",
		justifyContent: "center",
		alignItems: "center",
		color: "grey",
	},
	action: {
		flexDirection: "row",
		marginTop: 20,
		height: 45,
		width: "90%",
		borderWidth: 1,
		borderColor: "#f2f2f2",
		paddingBottom: 6,
		alignItems: "center",
		paddingHorizontal: 5,
		borderRadius: 10,
	},
	textInput: {
		width: "88%",
		paddingLeft: 10,
		color: "#05375a",
	},
});

export default Login;
