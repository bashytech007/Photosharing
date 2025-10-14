import {View,TextInput,Button,Alert,Text} from 'react-native'; // Added Alert
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {createEvent} from '../../services/events'
import { useAuth } from '@/providers/AuthProvider';
import { router } from 'expo-router';

export default function CreateEvent(){
    const [name,setName]=useState('');
    const {user} =useAuth();

    // The createEvent function expects an event object AND a userId string.
    const createEventMutation = useMutation({
        // 1. Correctly define the mutationFn to pass BOTH required arguments.
        mutationFn: () => {
            // Check for user/userId before proceeding
            if (!user?.id) {
                // If the user is null, throw an error or handle it gracefully
                throw new Error("User must be logged in to create an event.");
            }

            const newEventData = {
                name,
                // Note: owner_id is often the same as the userId, but they are separate arguments
                owner_id: user.id 
            };
            
            // This is the fix for the TS2554 error! 
            // Passing newEventData (Arg 1) and user.id (Arg 2)
            return createEvent(newEventData, user.id); 
        },
        onSuccess: (data) => {
            // Navigate to the newly created event's page
            router.replace(`/events/${data.id}`); // Use replace to prevent back button issues
        },
        onError: (error) => {
            // Display an error message to the user
            Alert.alert("Creation Failed", error.message);
            console.error(error);
        }
    });

    // Helper function to handle button press
    const handleCreate = () => {
        if (!name.trim()) {
            Alert.alert("Input Required", "Please enter a name for your event.");
            return;
        }
        
        // Disable button if loading or no user
        if (createEventMutation.isPending || !user) return; 

        createEventMutation.mutate();
    };

    return(
        <View className='flex-1 p-4 gap-4'>
            <TextInput 
            value={name}
            onChangeText={setName}
            placeholder="Event Name" 
            className='bg-neutral-800 p-5 rounded-lg '
            placeholderTextColor='gray'
            />
            <Button 
                title={createEventMutation.isPending ? "Creating..." : "Create Event"} 
                onPress={handleCreate}
                // Disable if loading or no user
                disabled={createEventMutation.isPending || !user} 
            />
            {!user && <Text style={{color: 'red'}}>You must be logged in to create an event.</Text>}
          </View>
    )
}


// import { useState } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { createEvent } from '@/services/events';
// import { useAuth } from '@/providers/AuthProvider';
// import { router } from 'expo-router';

// export default function CreateEvent() {
//   const [name, setName] = useState('');
//   const { user } = useAuth();
//   const queryClient = useQueryClient();

//   const createEventMutation = useMutation({
//     mutationFn: () => createEvent({ name, owner_id: user?.id }, user!.id),
//     onSuccess: (data) => {
//       setName('');
//       queryClient.invalidateQueries({ queryKey: ['events'] });
//       console.log('data', data);
//       router.replace(`/events/${data.id}`);
//     },
//   });

//   return (
//     <View className='flex-1 p-4 gap-4'>
//       <TextInput
//         value={name}
//         onChangeText={setName}
//         placeholder='Event Name'
//         className='bg-neutral-800 p-5 rounded-lg text-white'
//         placeholderTextColor='gray'
//       />
//       <Button
//         title='Create Event'
//         onPress={() => createEventMutation.mutate()}
//       />
//     </View>
//   );
// }

