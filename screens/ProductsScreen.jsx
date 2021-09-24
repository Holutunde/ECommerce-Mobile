import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Button,
	View,
	TextInput,
	Text,
	Image,
	Keyboard,
	TouchableWithoutFeedback,
	FlatList,
} from "react-native";
import Theme from "../constants/constants";
import Header from "../components/Header";
import Search from "../components/Search";

import Soft from "../components/Soft";
import { AppLoading } from "expo";
import {
	useFonts,
	Raleway_200ExtraLight,
	Raleway_100Thin,
	Raleway_400Regular,
	Raleway_500Medium,
} from "@expo-google-fonts/raleway";

const AllProducts = (props) => {
	const url2 = "https://my-django-store.herokuapp.com/api/v1/products/";
	const url = "http://127.0.0.1:8000/api/v1/products/";
	const url3 = "https://first-contacts-api.herokuapp.com/api/v1/contacts/";

	const [products, setProducts] = useState({ product: [], isLoading: false });
	const [search, setSearch] = useState("");
	const [filteredProduct, setFilteredProduct] = useState([]);

	const getProducts = async () => {
		setProducts({ product: [], isLoading: true });
		const response = await fetch(url3);
		const data = await response.json();
		setProducts({ product: data, isLoading: false });
	};
	
	const searchHandler = (searchValue) => {
		setSearch(searchValue);
	}
	useEffect(() => {
		getProducts();
	}, []);

	useEffect(() => {
		setFilteredProduct(
			products.product.filter((product) => {
				return product.name.toLowerCase().includes(search.toLowerCase());
			})
		);
	}, [search, products.product]);
	if (products.isLoading) {
		return (
			<Text>Loading</Text>
		)
	};
	console.log(filteredProduct);
	return (
		<View>
			<Search
				onChangeText={searchHandler}
				value={search}
				placeholder="Search"
			/>
			<FlatList
				data={filteredProduct}
				renderItem={(products) => (
					<View>
						<Products products={products} />
					</View>
				)}
			/>
		</View>
	);
};

const Products = (props, { navigation }) => {
	let [fontLoaded, error] = useFonts({
		Raleway_200ExtraLight,
		Raleway_100Thin,
		Raleway_400Regular,
		Raleway_500Medium,
	});

	let all_items = props.products.item
	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.login}>
				<Soft style={styles.cardArea}>
					<Text style={styles.text2}> {all_items.name} </Text>
					<Text style={styles.text2}> {all_items.email} </Text>
				</Soft>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	login: {
		flex: 1,
		width: "90%",
		margin: 10,
		alignItems: "center",
		// backgroundColor: 'blue',
	},

	text: {
		fontSize: 20,
		fontFamily: "Raleway_500Medium",
	},
	text2: {
		fontSize: 20,
		fontFamily: "Raleway_400Regular",
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
});

export default AllProducts;
