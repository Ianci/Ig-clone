import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements'
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import FlatButton from '../uiComponents/FlatButton';
import CustomButton from '../uiComponents/CustomButton'


export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermision] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [ camera, setCamera ] = useState(null)
  const [ photoUrl, setPhotoUrl ] = useState(null)
  const [ showCamera, setShowCamera] = useState(false)
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermision(galleryStatus.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }

  //Show camera btn
  const showCameraHandler = () => {
    setShowCamera(!showCamera)
  }

  //Take picture
  const takePicture  = async () => {
    if(camera){
      const data = await camera.takePictureAsync()
      console.log(data.uri)
      setPhotoUrl(data.uri)
    } 
  }

  //Pick image from gallery

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result)

    if (!result.cancelled) {
      setPhotoUrl(result.uri);
    }
  }

  const deletePhoto = () => {
    setPhotoUrl(null)
  }

  return (
    <View style={styles.container}>
        <View
        style={styles.camera} >
          <View style={styles.showCameraContainer}>
            <FlatButton title="Show camera" onPress={showCameraHandler} />
          </View>
        {showCamera &&
        <>
        <CustomButton
                      title="Change camera"
                        
                        onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                    }} />
              
        <Camera style={styles.fixedRatio} 
        ref={ref => setCamera(ref)}
        type={type} 
        ratio={'1:1'}
        
        />
                
          </>
        }
          {!!showCamera && <Button title="Take Picture" onPress={takePicture}/>   }
                 
                 
                {photoUrl && <Image source={{uri: photoUrl }} style={{flex: 1}}/>}
                <View>
                <CustomButton title="Choose Image from gallery" onPress={pickImage} style={styles.btnGallery}/>  
                {photoUrl && <Button title="Delete selected photo" onPress={deletePhoto} buttonStyle={styles.btnDelete}/> } 
                </View>
                
                 
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    showCameraContainer: {
      marginHorizontal: 10,
      marginVertical: 10
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    btnGallery: {
      marginVertical: 10,
      marginHorizontal: 10
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
    btnDelete: {
      borderRadius: 10,
      paddingVertical: 6,
      paddingHorizontal: 6,
      marginHorizontal: 60,
      marginVertical: 10,
      backgroundColor: '#8332AC'
    }
  });