import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Button,
	View,
	TextInput,
	Text,
	Image,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
	TouchableOpacity
} from "react-native";

import Theme from "../constants/constants";
import Soft from "../components/Soft";
import { AppLoading } from "expo-app-loading";
import { useFonts } from "expo-font";
// import {useFonts,} from "@expo-google-fonts/raleway";
import Header from "../components/Header";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Register = (props, { navigation }) => {
	const [fontLoaded, error] = useFonts({
		Gem: require("../assets/fonts/GemunuLibre-VariableFont_wght.ttf"),
		Itl: require("../assets/fonts/Italianno-Regular.ttf"),
		El: require("../assets/fonts/ElMessiri-VariableFont_wght.ttf"),
	});

	
    const [data, setData] = useState({
		email: '',
        username: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
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

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }


	const signupUrl =
		"https://ecomm-store-proj.herokuapp.com/api/v1/account/signup";
	const performSignup = async () => {
		const details = { email, password,username,gender };

		const response = await fetch(signupUrl, {
			method: "POST",
			body: JSON.stringify(details),
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
			},
		});

		const data = await response.json();
		console.log(data);
		// history.push("/");
		props.navigation.navigate("Login");
	};

	const alreadyRegistered = () => {
		props.navigation.navigate("Login");
	};

	return (
	<KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior='padding'
       >
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			{/* <Header /> */}
			<View style={styles.register}>
				<Image
					style={styles.registerVector}
					source={require("../assets/register.jpg")}
				/>
            
              <View style={styles.action}>
                <Feather
                    name="mail"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Email"
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
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
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
				    style={styles.eye2}
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
		
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
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
                    onPress={alreadyRegistered}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Sign up</Text>
                </TouchableOpacity>
				<View style={styles.toLogin}>
					<Text
						style={{
							// color: Theme.primary,
							fontSize: 20,
							fontFamily: Theme.font,
						}}
					>
						Already have an account?
					</Text>
					<Text
						style={{
							color: Theme.primary,
							fontSize: 20,
							fontFamily: Theme.font,
							paddingLeft:10
						}}
						onPress={alreadyRegistered}
					>
						Login
					</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	register: {
		flex: 1,
		alignItems:'center',
		justifyContent:'center'
	},

	inputArea: {
		justifyContent:'center',
		height: 45,
		width: "85%",
	    marginBottom:20
	},
	registerVector: {
		width: 300,
		height: 300,
	},

	toLogin: {
		padding: 20,
		flexDirection: "row",
	},
	button: {
		marginTop: 10,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "#00BCD4",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#fff",
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

export default Register;
