import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";
import { useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";

export async function saveToken(loginData) {
	try {
		const jsonLoginData = JSON.stringify(loginData);
		await AsyncStorage.setItem("loginInfo", jsonLoginData);
	} catch (error) {
		alert(error);
	}
}

export async function handleGoogleSignIn(navigation) {
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
	if (data.type == "cancel") {
		ToastAndroid.showWithGravity(
			"Operation Canceled",
			ToastAndroid.SHORT,
			ToastAndroid.TOP
		);
		return;
	}
	console.log("Google Auth Response", data);

	// const parsedData = JSON.parse(data)
	authWithGoogle(data.idToken, navigation);
}

export function toUserDetail(navigation) {
	navigation.navigate("UserDetail");
}

export async function authWithGoogle(idToken, navigation) {
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
	// console.log("Social Auth Response", socialAuthResponse);
	// if (loginRes.success != true) {
	// 	ToastAndroid.showWithGravity(
	// 		loginRes.error,
	// 		ToastAndroid.SHORT,
	// 		ToastAndroid.TOP
	// 	);
	// 	return;
	// }
	saveToken(socialAuthResponse);
	toUserDetail(navigation);
}
