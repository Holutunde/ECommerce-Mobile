import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const Input = (props) => {
	return (
		<View style={{ ...styles.soft, ...props.style }}>
			<TextInput style={{ ...styles.input }} placeholder={props.placeHolder} />
		</View>
	);
};

const styles = StyleSheet.create({
	soft: {
		shadowColor: "black",
		shadowOpacity: 0.4,
		shadowRadius: 3,
		shadowOffset: {
			width: 10,
			height: 5,
		},
		backgroundColor: "white",
		elevation: 10,
		borderRadius: 10,
	},
	input: {
		height: "10%",
	},
});

export default Input;
