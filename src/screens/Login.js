import { View, Text, StyleSheet, ImageBackground,Alert } from 'react-native'
import React, {useState} from 'react'
import { TextInput, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth'

import { useAuthContext } from "../contexts/AuthContext"

const initalState = { email: "", password: "", }

export default function Login({navigation}) {

    const { dispatch } = useAuthContext()

    
    const [state, setState] = useState(initalState)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isPasswordShow, setIsPasswordShow] = useState(false)


    const handleChange = (name, value) => {
        setState(s => ({ ...s, [name]: value }))
      }
    const handleSubmit = () =>{

        setIsProcessing(true)
        
        let{email, password} = state
        auth()
        .signInWithEmailAndPassword(email,password)
        .then((userCredential) => {
            const user = userCredential.user
            console.log(user)
            dispatch({ type: "LOGIN", payload: { user } })
            Alert.alert("Welcome,",user.email)
        })

        .catch((error) => {
            console.error(error)
            Alert.alert(error)
          })
    }

    return (
        <ImageBackground
            source={require('../database/images/bg2.jpg')}
            style={{
                flex: 1,
                justifyContent: 'center',
            }}>
            <View>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} >
                    <MaterialCommunityIcons
                        name='apple'
                        size={70}
                        color='black'
                    /></TouchableOpacity>

                <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'black', fontStyle: 'italic', textAlign: 'center' }}>Login </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    keyboardType="email-address"
                    onChangeText={val => handleChange("email", val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    onChangeText={val => handleChange("password", val)}
                    secureTextEntry={!isPasswordShow ? true : false}
                    right={<TextInput.Icon icon={isPasswordShow ? "eye-off" : "eye"} onPress={() => { setIsPasswordShow(!isPasswordShow) }} />}
                />

                <View style={styles.button}>
                <Button mode="contained" buttonColor='green' textColor='white' style={{ borderRadius: 20 }} loading={isProcessing ? true : false} onPress={handleSubmit}>Login</Button>
        
                <Button mode="contained" buttonColor='blue' textColor='white' style={{ borderRadius: 10, marginTop:30, }}  onPress={()=> navigation.navigate('SignUp')}>Dont have an account? click here</Button>
        
               </View> 
            </View>
        </ImageBackground>

    )
}


const styles = StyleSheet.create({


    input: {
        marginLeft:25,
        padding: 0,
        marginTop: 5,
        borderWidth: 1,
        height:40,
        width:320,
    },

    button: {
        maxHeight: 600,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        fontWeight: 'bold',
    }
});