import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const Soft = (props) => {
	return (
		<View style={{ ...styles.soft, ...props.style }}>
			{props.children}
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
		marginVertical: 5,
		alignItems: 'center',
		justifyContent:'center',
	},
});

export default Soft;
