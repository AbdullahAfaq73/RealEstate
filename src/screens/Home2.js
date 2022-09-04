import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, Linking } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOURS} from '../database/Database';
import {
  Box,
  ScrollView,
  AspectRatio,
  Image,
  Center,
  Stack,
  Heading,
  HStack,
  Button,
} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import { useAuthContext } from '../contexts/AuthContext';


export default function Home2({ navigation }) {

  const {isAuthenticated}= useAuthContext()
  const [documents, setDocuments] = useState([]);

  const { user} = useAuthContext()

  const fetchDocumets = () => {
    let array = [];
    firestore()
      .collection('Houses')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          array.push({ id: documentSnapshot.id, ...documentSnapshot.data() })
          // let data = { id: documentSnapshot.id, ...documentSnapshot.data() }
          // console.log(data)
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
        setDocuments(array)
      });
  }

  useEffect(() => {
    console.log("working")
    fetchDocumets()
  }, [])
  const cardGap = 15;
  const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2
  return (
    <ScrollView>
      <ImageBackground source={require('../database/images/bg2.jpg')}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name='home'
              size={35}
              color='black'
            /><Text
              style={{
                fontSize: 26,
                color: COLOURS.black,
                fontWeight: 'bold',
                letterSpacing: 1,
                marginBottom: 10,
              }}>
              Afaq's RealEstate
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: COLOURS.black,
                  fontWeight: 'bold',
                  // letterSpacing: 1,
                }}>
                Properties
              </Text>

            </View>

            <View
              style={{
                // padding: 10,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  lineHeight: 24,
                }}>
                Buy and Sell Properties online.
                {'\n'}Now you can make deals sitting in your home.
              </Text>
            </View>

          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('MyAdd') }}>
            <MaterialCommunityIcons
              name="plus"
              size={25}
              style={{
                color: COLOURS.blue,
                backgroundColor: COLOURS.white,
                padding: 12,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: COLOURS.backgroundDark,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={Styles.flexContainer}>
          <Box py="3">
            <Heading style={{textAlign:'center'}}>Available Adds</Heading>
            <Box
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              {documents.map((item, index) => {
                return (
                  <Box
                    style={{
                      paddingTop: 30,
                      paddingBottom: 30,
                    }}
                    key={item.id}>
                    <Box
                      maxW="80"
                      rounded="lg"
                      overflow="hidden"
                      borderColor="coolGray.200"
                      borderWidth="1"
                      _dark={{
                        borderColor: 'coolGray.600',
                        backgroundColor: 'gray.700',
                      }}
                      _web={{
                        shadow: 2,
                        borderWidth: 0,
                      }}
                      _light={{
                        backgroundColor: 'gray.50',
                      }}>
                      <Box>
                        <AspectRatio w="100%" ratio={16 / 9}>
                          <Image
                            source={{
                              uri: item.image,
                            }}
                            alt="image"
                          />
                        </AspectRatio>
                        <Center
                          bg="violet.500"
                          _dark={{
                            bg: 'violet.400',
                          }}
                          _text={{
                            color: 'warmGray.50',
                            fontWeight: '700',
                            fontSize: 'xs',
                          }}
                          position="absolute"
                          bottom="0"
                          px="3"
                          py="1.5">
                          PHOTOS
                        </Center>
                      </Box>
                      <Stack p="4" space={3}>
                        <Stack space={2}>
                          <Heading size="md" ml="-1">
                            <Text style={{ paddingTop: 5, paddingBottom: 5, fontWeight: 'bold', }}>
                              {item.productTitle}
                            </Text>
                          </Heading>
                          <Text
                            fontSize="xs"
                            _light={{
                              color: 'violet.500',
                            }}
                            _dark={{
                              color: 'violet.400',
                            }}
                            fontWeight="500"
                            ml="-0.5"
                            mt="-1">
                           {item.location}
                          </Text>
                        </Stack>
                        <Text style={{ color: 'black', paddingBottom: 3 }}>
                          PKR .{item.description}
                        </Text>
                        <HStack
                          alignItems="center"
                          space={4}
                          justifyContent="space-between">
                          <HStack alignItems="center">
                           
                          </HStack>
                          <Text style={{ color: 'green', paddingBottom: 3 }}>
                            PKR .{item.price}
                          </Text>

                        </HStack>
                        <Text style={{ color: 'blue', paddingBottom: 3 }}>
                         Add by: {item.createdBy}
                          </Text>

                          <Text style={{ color: 'black', paddingBottom: 3 }}>
                         Contact: {item.phonenNO}
                          </Text>
                        

                        <Box>
                          <Button
                            onPress={() => {
                              Linking.openURL('mailto:abdullahafaq73@gmail.com');
                            }}
                            style={{
                              backgroundColor: '#0d6efd',
                              color: 'white',
                            }}>
                            Contact Seller
                          </Button>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
       


                );
              })}
            </Box>
          </Box>
        </View>
      </ImageBackground>
    </ScrollView>
  )
}



const Styles = StyleSheet.create({
  flexContainer: {
    alignItems: 'center',
    flex: 1,
  },
  heading: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  productImage: {
    width: 100,
    height: '50%',
  },
});












