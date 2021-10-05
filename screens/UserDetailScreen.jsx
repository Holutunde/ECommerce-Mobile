import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Button,
	View,
	Text,
	Alert,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	TouchableWithoutFeedback,
} from "react-native";
import { useFonts } from "@expo-google-fonts/raleway";
import Theme from "../constants/constants";
import * as SecureStore from "expo-secure-store";
import Header from "../components/Header";
import Soft from "../components/Soft";
import AsyncStorage from "@react-native-async-storage/async-storage";
const UserDetail = (props, { navigation }) => {
	let [loginData, setLoginData] = useState({});
	const [updated, setUpdated] = useState(false);
	const [user, setUser] = useState({ user_info: [], isLoading: false });

	const userInfourl = "https://ecomm-store-proj.herokuapp.com/api/v1/user";

	const [fontLoaded] = useFonts({
		Gem: require("../assets/fonts/GemunuLibre-VariableFont_wght.ttf"),
		Itl: require("../assets/fonts/Italianno-Regular.ttf"),
		El: require("../assets/fonts/ElMessiri-VariableFont_wght.ttf"),
		Jos: require("../assets/fonts/JosefinSans-VariableFont_wght.ttf"),
	});

	const backToLogin = () => {
		props.navigation.navigate("Login");
	};

	const getStorageValue = async (key) => {
		try {
			const data = await AsyncStorage.getItem(key);
			parsedData = JSON.parse(data);
			console.log(parsedData)
			if (parsedData == null) {
									Alert.alert("Error", "Invalid Login Credentials", [
						{
							text: "Cancel",
							style: "default",
							onPress: backToLogin,
						},
					]);
			} else if (parsedData.success == false) {
				if (parsedData.error) {
					Alert.alert("Invalid Details", parsedData.error, [
						{
							text: "Cancel",
							style: "default",
							onPress: backToLogin,
						},
					]);
				} else {
					Alert.alert("Invalid Details", parsedData.details, [
						{
							text: "Cancel",
							style: "default",
							onPress: backToLogin,
						},
					]);
				}

				return (
					<View
						style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
					>
						<ActivityIndicator size="large" color={Theme.primary} />
					</View>
				);
			} else {
				setLoginData(parsedData);
				setUpdated(true);
				getUser(parsedData.access);
			}
		} catch (error) {
			alert(error);
		}
	};

	const getUser = async (token) => {
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
			setUser({ user_info: data, isLoading: false });
		} catch (error) {
			alert(error);
		}
	};

	useEffect(() => {
		getStorageValue("loginInfo");
	}, []);

	const sampleData = {
		username: "Aina Emmanuel",
		email: "ainae06@gmail.com",
		img: `https://picsum.photos/${styles.img.width}`,
		bio: "I am a software developer with 1 week experience with backend engineering",
	};

	if (!fontLoaded) {
		return null;
	}

	if (user.isLoading == true) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color={Theme.primary} />
			</View>
		);
	}
	// console.log(user.user_info);
	return (
		<View style={styles.container}>
			<View
				style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
			>
				<Soft style={styles.cardArea}>
					{/* <Text style={styles.welcomeText}>
						Welcome, {user.user_info?.[0]?.username}
					</Text> */}
					<View
						style={{ justifyContent: "center", alignItems: "center" }}
					>
						<View>
							<Image
								style={styles.img}
								source={{ uri: user.user_info?.[0]?.profile_picture }}
							/>
						</View>
						<View>
							<Text style={styles.nameText}>
								{user.user_info?.[0]?.username}
							</Text>
						</View>
						<View>
							<Text style={styles.mailText}>{user.user_info?.[0]?.email}</Text>
						</View>
						<View>
							<Text style={styles.bioText}>
								{" "}
								Hello, I am a software engineer who enjoys coding
							</Text>
						</View>
					</View>
					<View
						style={{
							flex:1,
							width: "100%",
							paddingTop: 10,
							flexDirection: "row",
							justifyContent: 'space-evenly',
						}}
					>
						<View>
							<Text style={styles.mailText}>Cart</Text>
							<Text style={{textAlign:'center'}}>5</Text>
						</View>
						<View>
							<Text style={styles.mailText}>Wishlist</Text>
						</View>
						<View>
							<Text style={styles.mailText}>Liked</Text>
						</View>
					</View>
				</Soft>

			</View>
			{/* <View style={styles.imageContainer}>
				<Image
					style={styles.img}
					source={{ uri: user.user_info?.[0]?.profile_picture }}
				/>
			</View> */}

			<View style={styles.infoStyle}>
				<Button
					color={Theme.primary}
					style={{ paddingTop: 20, marginTop: 40 }}
					title="Edit Profile"
					onPress={() => { AsyncStorage.removeItem("loginInfo")}}
				/>
			</View>

			<View
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					bottom: 0,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{/* <View> */}
				<TouchableOpacity style={styles.roundButton2}>
					<Text style={styles.footerText}>Joined September 2021</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		// marginTop: 150,
	},
	nameText: {
		fontSize: 17,
		fontFamily: "El",
		color: "black",
	},
	mailText: {
		fontSize: 15,
		fontFamily: Theme.font,
		color: "grey",
	},
	bioText: {
		fontSize: 15,
		fontFamily: Theme.font,
		paddingBottom: 20,
		color: "grey",
	},
	footerText: {
		fontSize: 15,
		// fontFamily: "Jos",
		color: "#ffff",
	},
	welcomeText: {
		fontSize: 30,
		justifyContent: "flex-start",
		color: "black",
		fontFamily: "El",
		fontStyle: "normal",
	},
	cardArea: {
		flex: 1,
		width: "100%",
		padding: 0,
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
		width: 150,
		height: 150,
		borderRadius: 400 / 2,
		marginTop: 100,
		// justifyContent: "center",
	},
	roundButton2: {
		marginTop: 20,
		width: 150,
		height: 30,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
		borderRadius: 20,
		backgroundColor: Theme.primary,
	},
	imageCircleBack: {
		marginTop: 20,
		width: 200,
		height: 200,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
		borderRadius: 200,
		backgroundColor: "#cfcfcf",
	},
	themeStyle: {
		height: "30%",
		backgroundColor: Theme.primary,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 40,
	},

	infoStyle: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export default UserDetail;