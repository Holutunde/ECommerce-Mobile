import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Theme from "../constants/constants";
import Search from "./Search";

const Header = (props) => {
	return (
		<View style={styles.header}>
			<Text style={styles.headerTitle}>{props.title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: 50,
		paddingTop: 10,
		backgroundColor: Theme.primary,
		alignItems: "center",
		justifyContent: "center",
	},

	headerTitle: {
		fontSize: 20,
		color: "white",
	},
});

export default Header;
