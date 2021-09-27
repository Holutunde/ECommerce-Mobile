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
import AppLoading from "expo-app-loading";
import {
	Raleway_200ExtraLight,
	Raleway_100Thin,
	Raleway_400Regular,
	Raleway_500Medium,
} from "@expo-google-fonts/raleway";

import { useFonts } from "expo-font";

const AllProducts = (props) => {
	const url = "https://ecomm-store-proj.herokuapp.com/api/v1/product/";

	const [products, setProducts] = useState({ product: [], isLoading: false });
	const [search, setSearch] = useState("");
	const [filteredProduct, setFilteredProduct] = useState([]);

	const getProducts = async () => {
		setProducts({ product: [], isLoading: true });
		const response = await fetch(url);
		const data = await response.json();
		setProducts({ product: data.results, isLoading: false });
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
				return product.product_name.toLowerCase().includes(search.toLowerCase());
			})
		);
	}, [search, products.product]);

	if (products.isLoading) {
		return (
			<Text>Loading...</Text>
			// <AppLoading />
		)
	};
	return (
		<View>
			<Search
				onChangeText={searchHandler}
				value={search}
				placeholder="Search"
			/>
			<View style={styles.screen}>
				<FlatList
					keyExtractor={(item, index) => item.id}
					data={filteredProduct}
					renderItem={(products) => (
						<View>
							<Products products={products} />
						</View>
					)}
				/>
			</View>
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
					<Image style={styles.img} source={{ uri: all_items.product_image }} />
					<Text style={styles.text2}> {all_items.product_name} </Text>
					<Text style={styles.text2}> ₦{all_items.product_price_ngn} </Text>
				</Soft>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		flexDirection: "row",
	},
	login: {
		flex: 1,
		width: "90%",
		margin: 10,
		alignItems: "center",
		justifyContent: "center",

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
	img: {
		width: 86,
		height: 78,
	},
});

export default AllProducts;
