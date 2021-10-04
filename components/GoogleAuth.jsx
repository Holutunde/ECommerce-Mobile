import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Soft from "./Soft";


const GoogleAuthButton = (props) => {
	return (
		<View>
			<TouchableWithoutFeedback onPress={props.googleAuth}>
				<Soft style={styles.googleSignIn} onPress={props.googleAuth.bind(this, props.id)}>
					<Image
						style={{ width: 30, height: 30 }}
						source={{
							uri: "http://assets.stickpng.com/thumbs/5847f9cbcef1014c0b5e48c8.png",
						}}
					/>
					<Text> Continue with google</Text>
				</Soft>
			</TouchableWithoutFeedback>
		</View>
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
});

export default GoogleAuthButton;
