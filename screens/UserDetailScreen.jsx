import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Button,
	View,
	Text,
	Alert,
	Image,
	TouchableOpacity,
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
	});

	const backToLogin = () => {
		props.navigation.navigate("Login");
	};

	const getStorageValue = async (key) => {
		try {
			const data = await AsyncStorage.getItem(key);
			parsedData = JSON.parse(data);
			if (parsedData.success == false) {
				Alert.alert("Invalid Details", parsedData.error, [
					{
						text: "Cancel",
						style: "default",
						onPress: backToLogin,
					},
				]);
				return;
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
			setUser({ user_info: data.results, isLoading: false });
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

	return (
		<View style={styles.container}>
			<Image style={styles.img} source={{ uri: sampleData.img }} />
			<Text style={styles.text2}>
				{"Welcome", user.user_info?.[0]?.username }
			</Text>
			<Text style={styles.bio}> { user.user_info?.[0]?.gender } </Text>
			<Button color="black" style={{}} title="Edit Profile" />

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

			{/* <Soft style={styles.cardArea}> */}
			{/* <Text style={styles.text2}> {`Welcome ${sampleData.username}!`} </Text> */}
			{/* <Text style={styles.text2}> ₦{user.user_info?.[0]?.email} </Text> */}
			{/* </Soft> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		marginTop: 50,
	},

	bio: {
		fontSize: 20,
		fontFamily: Theme.font,
	},
	footerText: {
		fontSize: 15,
		fontFamily: Theme.font,
		color: "grey",
	},
	text2: {
		fontSize: 30,
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
		width: 200,
		height: 200,
		borderRadius: 400 / 2,
		paddingTop: 30,
		justifyContent: "center",
	},
	roundButton2: {
		marginTop: 20,
		width: 150,
		height: 30,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
		borderRadius: 20,
		backgroundColor: "#cfcfcf",
	},
});

export default UserDetail;
