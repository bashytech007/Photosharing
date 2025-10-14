import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState ,useRef} from 'react';
import { ActivityIndicator, Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { useLocalSearchParams } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertAsset } from '@/services/assets';
import { useAuth } from '@/providers/AuthProvider';
export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

// const {id}=useLocalSearchParams<{id:string}>();
// console.log("ID :",id)
const {id} = useLocalSearchParams<{id:string}>();
const {user}=useAuth();
const queryClient=useQueryClient();

const insertAssetMutation=useMutation({
  mutationFn:(assetId:string)=>insertAsset({event_id:id,user_id:user?.id,asset_id:assetId}),
  onSuccess:()=>{
    queryClient.invalidateQueries({queryKey:['events',id]})
  }
})

// Add this safety check
if (!id || Array.isArray(id)) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-white">Invalid event ID</Text>
    </View>
  );
}
  const camera =useRef<CameraView>(null)
  if (!permission) {
    // Camera permissions are still loading.
    return <ActivityIndicator />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePhoto(){
        console.log('takephoto')

   const photo=await camera.current?.takePictureAsync();
       if (!photo?.uri) return; 
    const cloudinaryResponse=await uploadToCloudinary(photo.uri)

    console.log(JSON.stringify(cloudinaryResponse,null,2))

    insertAssetMutation.mutate(cloudinaryResponse.public_id)
  }

  return (
    <View style={styles.container}>
      <CameraView ref={camera} style={styles.camera} facing={facing} >

       <View className='absolute bottom-0.5 mb-8 bg-neutral-900/25 h-15 w-full p-4'>
       <Ionicons name="camera-outline" size={24} color="white" onPress={toggleCameraFacing}/>
        </View> 
      </CameraView>
      {/* Footer */}
      <SafeAreaView edges={['bottom']} className='flex-row bg-transparent w-full p-4 justify-center '>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Pressable onPress={takePhoto} className='bg-white rounded-full w-20 h-20'/>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    backgroundColor:'red'
  },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 64,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     width: '100%',
//     paddingHorizontal: 64,
//   },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
