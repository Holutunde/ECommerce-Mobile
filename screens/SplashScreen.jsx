import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();
 
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#8EA2FF' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
                source={require('../pictures/cart.png')}
                style={styles.logo}
                resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={styles.footer}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Stay connected with everyone!</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <LinearGradient
                    colors={['#524bc8', '#8EA2FF']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#8EA2FF'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#8EA2FF'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      //borderTopLeftRadius: 30,
      //borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 35
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});

