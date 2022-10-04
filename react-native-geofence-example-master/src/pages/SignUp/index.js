import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState }from 'react'
import { Header, TextInput, Button, Gap } from '../../components';
import { launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';

const SignUp = ({navigation}) => {

    // const [photo, setPhoto] = useState('');
    // const [hasPhoto, setHasPhoto] = useState(false);

    // const getPhoto = async () => {
    //     const result = await launchImageLibrary({
    //         maxHeight: 200, 
    //         maxWidth: 200,
    //         includeBase64: true,
    //     });
    //     if(result.didCancel){
    //         setHasPhoto(false)
    //         showMessage({
    //             message: "Upload foto dibatalkan",
    //             type: 'default',
    //             backgroundColor: '#D9435E',
    //             color: 'white',
    //         })
    //     } else {
    //         setPhoto(result.assets[0].uri)
    //         setHasPhoto(true);        }
    // };

  return (
    <View style={styles.page} >
      <Header title="Sign Up" onBack={() => navigation.goBack()}/>
        <View style={styles.containWrapper} >
            {/* <View style={styles.avatarWrapper} >
                <View style={styles.border}>
                        <TouchableOpacity onPress={getPhoto} activeOpacity={0.7} >
                            {!hasPhoto && (<View style={styles.addPhoto} >
                                <Text style={styles.addPhotoText} >Add Photo</Text>
                                </View>
                            )}
                            {hasPhoto && (
                                <Image source={{uri: photo}} style={styles.avatar} />
                            )}
                        </TouchableOpacity>
                </View>
            </View> */}

            <TextInput title="Full Name" placeholder="Enter your full name"/>
            <Gap height={16}/>
            <TextInput title="Email Address" placeholder="Enter your email address"/>
            <Gap height={16}/>
            <TextInput title="Password" placeholder="Enter your password"/>
            <Gap height={24}/>
            <Button title="Continue" textColor='white' color='#3DAB2B' onPress={()=>navigation.navigate('Menu')}/>
        </View>  
    </View>
  )
}

export default SignUp;

const styles = StyleSheet.create({
    page: {
        flex: 1,

    },
    containWrapper: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 24,
        paddingHorizontal: 24,
    },
    addPhoto: {
        width: 90,
        height: 90,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 90,
    },
    addPhotoText: {
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        maxWidth: 41,
        textAlign: 'center',
    },
    border: {
        borderWidth: 1,
        borderColor: '#8D92A3',
        width: 110,
        height: 110,
        borderRadius: 110,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 90,
    },
    avatarWrapper: {
        alignItems: 'center',
        marginTop: 26,
        marginBottom: 16,
    }
})