import { View, Text, StyleSheet, ImageBackground, Alert } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput, Button } from 'react-native-paper';
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';
import firebase from "@react-native-firebase/app"

import { useAuthContext } from '../contexts/AuthContext';

const initalState = { email: "", password: "", firstName: "", lastName: "", useName: "", MobileNo: "" }

export default function Login({ navigation }) {
    const { dispatch } = useAuthContext()

    const [state, setState] = useState(initalState)
    const [isPasswordShow, setIsPasswordShow] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = (name, value) => {
        setState(s => ({ ...s, [name]: value }))
    }
    const handleSubmit = () => {

        let { email, password } = state

        if (!email) {
            alert("Please enter your email")
            return
        }
        if (password.length < 6) {
            alert("Password must be 6 chars")
            return
        }


        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                createUserProfile(user)
                console.log("userCredential =>", user)
                Alert.alert("Account created!!")
                // createUserProfile(user)
            })

            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('That email address is already in use!')
                    // console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert('That email address is invalid!')
                    // console.log('That email address is invalid!');
                }
            })

    }


    const createUserProfile = (user) => {
        let formData = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: user.email,
            uid: user.uid,
            username: state.useName,
            MobileNo: state.MobileNo,
            dateCreated: firebase.firestore.FieldValue.serverTimestamp()
        }
        firestore()
            .collection('users')
            .doc(user.uid)
            .set(formData)
            .then(() => {
                console.log('User added!');
                dispatch({ type: "LOGIN", payload: { user } })
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                setIsProcessing(true)
            })
    }





    return (
        <ImageBackground
            source={require('../database/images/bg3.png')}
            style={{
                flex: 1,
                justifyContent: 'center',
            }}

        >
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

                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 25,
                    paddingBottom: 12,
                    color: 'black',
                    fontStyle: 'italic',
                    textAlign: 'center'
                }}>Register Your Account</Text>

                <View>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter Firstname"
                        keyboardType="text"
                        onChangeText={val => handleChange("firstName", val)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        keyboardType="text"
                        onChangeText={val => handleChange("lastName", val)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Create username"
                        keyboardType="text"
                        onChangeText={val => handleChange("usename", val)}
                    />

<TextInput
                        style={styles.input}
                        placeholder="Enter Mobile No."
                        keyboardType="text"
                        onChangeText={val => handleChange("MobileNo", val)}
                    />




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
                </View>
                <View style={styles.button}>
                    <Button mode="contained" buttonColor='green' textColor='white' style={{ borderRadius: 4 }} loading={isProcessing ? true : false} disabled={isProcessing ? true : false} onPress={handleSubmit}>Register</Button>
                    <Button mode="contained" buttonColor='blue' textColor='white' style={{ borderRadius: 10, marginTop: 30, }} loading={isProcessing ? true : false} onPress={() => navigation.navigate('Login')}>Already have an account? click here</Button>

                </View>
            </View>
        </ImageBackground>

    )
}


const styles = StyleSheet.create({


    input: {

        marginLeft: 25,
        padding: 0,
        marginTop: 5,
        borderWidth: 1,
        height: 40,
        width: 320,
    },

    button: {
        maxHeight: 500,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        fontWeight: 'bold',

    }
});