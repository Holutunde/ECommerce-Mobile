import React from "react";
import { StyleSheet, Button, View,TextInput } from "react-native";
import Theme from "../constants/constants";
import Soft from "./Soft";

const Search = (props) => {
	return (
		<View style={styles.search}>
			<Soft style={styles.softStyle}>
				<TextInput placeholder="Search"/>
			</Soft>
			<Button title='Search' />
		</View>
	);
};

const styles = StyleSheet.create({
	search: {
		flexDirection:'row',
		width: "90%",
		padding: 10,
	},
	softStyle: {
		width: '90%',
		borderColor:Theme.primary,
		borderWidth:2,
	},
});

export default Search;
