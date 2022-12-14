import {View, Text, StyleSheet, Alert, ImageBackground,} from 'react-native';
import React, {useContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import firebase from "@react-native-firebase/app"
import {
 Heading,
 Input,
 Stack,
 FormControl,
 Image,
 Box,
 Button,
} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAuthContext} from "../contexts/AuthContext"


export default function About() {
   const { dispatch } = useAuthContext()
const { user } = useAuthContext(useAuthContext)

 const [selectImage, setselectImage] = useState('');
 const [productTitle, setproductTitle] = useState('');
 const [category, setCategory] = useState('');
 const [price, setPrice] = useState('');
 const [description, setDescription] = useState('');
 const [phonenNO, setphoneNo] = useState('');
 const [location, setlocation] = useState('');



 console.log(productTitle);
 const submitHandler = async () => {
try {
   

 await storage()
 .ref(`images/${selectImage.fileName}`)
 .putFile(selectImage.uri)


   const url = await storage()
   .ref(`images/${selectImage.fileName}`)
   .getDownloadURL()   

 const obj = {
 productTitle,
 category,
 price,
 description,
 phonenNO,
 location,
 image: url,
 createdBy: user.email,
//   createdbby: user.email,
 dateCreated: firebase.firestore.FieldValue.serverTimestamp()
 };



 await firestore().collection('Houses').add(obj)
    Alert.alert('Add Placed')
    
 setproductTitle('');
 setCategory('');
 setPrice('');
 setDescription('');
 setphoneNo('');
 location('');
// console.log(user);
} catch (error) {
 console.log("error in add product", error); 
}

 };



 let options = {
 title: 'Select Image',
 customButtons: [
 {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
 ],
 storageOptions: {
 skipBackup: true,
 path: 'images',
 },
 };
 const selectIamge = async () => {
 const result = await launchImageLibrary(options, res => {
 console.log(res);
 setselectImage(res.assets[0]);
 });
 };
 return (
 <View style={Styles.flexContainer}>
 <Heading>Post Your add</Heading>
 <FormControl>
 <Stack
 p="2"
 style={{
 display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 }}>
 <Input
 placeholder="Add Title"
 w="45%"
 value={productTitle}
 onChangeText={e => setproductTitle(e)}
 />
 <Input
 mx="2"
 placeholder="Category"
 w="45%"
 value={category}
 onChangeText={e => setCategory(e)}
 />
 </Stack>
 <Stack
 p="2"
 space={5}
 style={{
 display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 }}>

 <Input
 type="file"
 placeholder="Price"
 w="45%"
 value={price}
 keyboardType={'numeric'}
 onChangeText={e => setPrice(e)}
 />
 <Input
 mx="2"
 placeholder="Description"
 w="45%"
 value={description}
 onChangeText={e => setDescription(e)}
 />
 </Stack>
<Stack
p="2"
space={5}
style={{
display: 'flex',
flexDirection: 'row',
justifyContent: 'center',}}
>
<Input
 type="file"
 placeholder="Enter detailed loaction"
 w="45%"
 value={location}
 keyboardType={'text'}
 onChangeText={e => setlocation(e)}
 />
<Input
 type="file"
 placeholder="Phone Number"
 w="45%"
 value={phonenNO}
 keyboardType={'numeric'}
 onChangeText={e => setphoneNo(e)}
 />
</Stack>

 <Box
 style={{
 display: 'flex',
 justifyContent: 'center',
 alignItems: 'center',
 flexDirection: 'row',
 }}>
 <Button onPress={selectIamge}
 style={{marginTop:10,}}
 w="45%"
 >
 <Text style={{
    color: 'white',
}}>Select Image</Text>
 </Button>
 </Box>
 <Box alignItems="center" py="3">
 <Image
 source={{uri: selectImage.uri}}
 alt="Alternate Text"
 size="xl"
 />
 </Box>
 <Box>
 <Button onPress={submitHandler}>
 <Text style={{color: 'white'}}>Post Add </Text>
 </Button>
 </Box>
 </FormControl>
 </View>
 );
}
const Styles = StyleSheet.create({
 flexContainer: {
 alignItems: 'center',
 paddingTop: 10,
 paddingBottom: 10,
 },
});







