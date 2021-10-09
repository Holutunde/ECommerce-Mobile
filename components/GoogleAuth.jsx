import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	TouchableHighlight,
	Pressable,
	TouchableNativeFeedback
} from "react-native";
import { TouchableWithoutFeedback, Touc } from "react-native-gesture-handler";
import Soft from "./Soft";

import { useFonts } from "expo-font";

const GoogleAuthButton = (props) => {
	const [fontLoaded] = useFonts({
		Rbt_r: require("../assets/fonts/Roboto-Regular.ttf"),
		Rbt_b: require("../assets/fonts/Roboto-Bold.ttf"),
		DM_r: require("../assets/fonts/DMSans-Regular.ttf"),
		DM_b: require("../assets/fonts/DMSans-Bold.ttf"),
	});

	return (
		<Pressable onPress={props.googleAuth}>
			<Soft
				style={styles.googleSignIn}
				onPress={props.googleAuth.bind(this, props.id)}
			>
				<Image
					style={{ width: 30, height: 30 }}
					source={{
						uri: "http://assets.stickpng.com/thumbs/5847f9cbcef1014c0b5e48c8.png",
					}}
				/>
				<Text style={styles.googleText}> Continue with google</Text>
			</Soft>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	googleSignIn: {
		width: 200,
		height: 60,
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginTop: 12,
	},
	googleText: {
		fontSize: 12,
		color: "#4c8bf5",
		fontFamily: "DM_b",
	},
});

export default GoogleAuthButton;
