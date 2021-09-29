import React, { useState } from "react";
import {
	StyleSheet,
	View,
	TextInput,
	Text,
	Image,
	Keyboard,
	Animatable,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Alert,
	TouchableOpacity
} from "react-native";

import Theme from "../constants/constants";

import Soft from "../components/Soft";
import { useFonts } from "@expo-google-fonts/raleway";
import * as SecureStore from "expo-secure-store";

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = (props, { navigation }) => {
	let [fontLoaded] = useFonts({
		El: require("../assets/fonts/ElMessiri-VariableFont_wght.ttf"),
		Gem: require("../assets/fonts/GemunuLibre-VariableFont_wght.ttf"),
	});

	const [isFocused, setFocused] = useState(false)

    const [data, setData] = useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
    });

	const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

	const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
	const notRegistered = () => {
		props.navigation.navigate("Register");
	};

	const Registered = () => {
		props.navigation.navigate("Products");
	};
	const loginUrl =
		"https://ecomm-store-proj.herokuapp.com/api/v1/account/login";

	var datas;
	const performLogin = async () => {
		const details = { email, password };
		const response = await fetch(loginUrl, {
			method: "POST",
			body: JSON.stringify(details),
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
			},
		});

		const data = await response.json();
		await saveToken(data);
		toUserDetail();
	};

	const saveToken = async (data) => {
		try {
			const jsonData = JSON.stringify(data);
			await AsyncStorage.setItem("loginInfo", jsonData);
			console.log("Data Saved Successfully!")
		} catch (error) {
			alert(error)
			console.log("Data Saved Successfully!");
		}
	};

	const toProducts = () => {
		props.navigation.navigate("Products");
	};

	const toUserDetail = () => {
		props.navigation.navigate("UserDetail");
	}
	if (!fontLoaded) {
		return null;
	}

	return (
		<KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior='padding'
       >
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.container}>

				<Image
					style={styles.loginVector}
					source={require("../pictures/login.jpg")}
				/>

               <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
				    onFocus={() => setFocused(true)}
                    placeholder="Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
    
				<View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
		
              
				<TouchableOpacity
                    onPress={Registered}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Log in</Text>
                </TouchableOpacity>
				<View style={styles.toRegister}>
					<Text style={{ fontSize: 20, fontFamily: Theme.font }}>
						Don't have an account?
					</Text>
					<Text
						style={{
							color: Theme.primary,
							fontSize: 20,
							fontFamily: Theme.font,
						    paddingLeft:10
						}}
						onPress={notRegistered}
					>
						Sign up
					</Text>
				</View>
			</View>
		 </TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	 container: {
		flex: 1,
		alignItems:'center',
		marginTop:100
	},
	inputArea: {
		justifyContent:'center',
		height: 45,
		width: "85%",
	    marginBottom:20
	},
	textInput: {
		width: "100%",
		fontSize: 15,
		paddingStart: 10
	},
	loginVector: {
		width: 300,
		height: 300,
	},
	toRegister: {
		padding: 20,
		flexDirection: "row",
	},
	signIn:{
		backgroundColor: "#8EA2FF",
		borderWidth:1,
	    width: '90%',
	    height: 45,
		marginTop:20,
	    justifyContent: 'center',
	    alignItems: 'center',
     	borderRadius: 10,
    },
    textSign: {
 	   fontSize: 18,
	   fontWeight: 'bold',
	   justifyContent:'center',
	   alignItems:'center',
	   color:'grey'
   },
   action: { 
      flexDirection: 'row',
	  marginTop:20,
      height:45,
	  width:'90%',
	  borderWidth: 1,
	  borderColor: '#f2f2f2',
	  paddingBottom: 6,
	  alignItems:'center',
	  paddingHorizontal:5,
	  borderRadius:10
    },
   textInput: {
	  width:"88%",
	  paddingLeft: 10,
      color: '#05375a',
    },
});

export default Login;
