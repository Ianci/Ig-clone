import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [ camera, setCamera ] = useState(null)
  const [ photoUrl, setPhotoUrl ] = useState(null)
  const [ showCamera, setShowCamera] = useState(false)
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const showCameraHandler = () => {
    setShowCamera(!showCamera)
  }

  const takePicture  = async () => {
    if(camera){
      const data = await camera.takePictureAsync()
      console.log(data.uri)
      setPhotoUrl(data.uri)
    } 
  }
  return (
    <View style={styles.container}>
        <View
        style={styles.camera} >
        <Button title="Show camera" onPress={showCameraHandler} />
        {showCamera &&
        <>
        <Camera style={styles.fixedRatio} 
        ref={ref => setCamera(ref)}
        type={type} 
        ratio={'1:1'}
        
        />
    
                <Button
                    title="Flip Image"
                        style={styles.button}
                        onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                        }}>
                    
                </Button>
          </>
        }
        
                <Button title="Take Picture" onPress={takePicture}/>      
                {photoUrl && <Image source={{uri: photoUrl }} style={{flex: 1}}/>}
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
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
  });