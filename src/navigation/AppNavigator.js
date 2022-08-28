import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home2 from '../screens/Home2'
import ProductInfo from '../screens/ProductInfo'
import myAdd  from '../screens/myAdd'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer' 
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import { useAuthContext } from '../contexts/AuthContext';
import { Alert} from 'react-native'
import auth from "@react-native-firebase/auth"

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigator() {



   const {isAuthenticated}= useAuthContext()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated
      ? <Stack.Group>
        <Stack.Screen name="Root" component={MyDrawer} />
      <Stack.Screen name="Home" component={Home2} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} />
      <Stack.Screen name="MyAdd" component={myAdd}
      options={{title:'Post you Add'}}
      />    

        </Stack.Group> 
       : <Stack.Group>
         <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Group>}
        </Stack.Navigator>
        
    </NavigationContainer>
  )
}


const CustomDrawerContent = (props) => {
  
  const { user, dispatch } = useAuthContext()
  console.log("user at home screen =>", user)
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={()=> auth().signOut()
          .then(() => {
            dispatch({ type: "LOGOUT" })
            Alert.alert("Logged out")
            console.log('logged out')
          })
          .catch(err => {
            console.error(err)
          })
          .finally(() => {
            setIsProcessing(false)
          })}
      />
    </DrawerContentScrollView>
  );
}



const MyDrawer = () => {
  return (
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home2} />
      {/* <Drawer.Screen name="Houses7marla" component={Home2} />
      <Drawer.Screen name="Houses5marla" component={Home3} />
      <Drawer.Screen name="Houses10marla" component={Home4} />  */}
      <Drawer.Screen name="MyAdd" component={myAdd}  options={{title:'Upload Add'}} />    

    </Drawer.Navigator>
  );
}
