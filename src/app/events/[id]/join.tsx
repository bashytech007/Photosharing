// import { View ,Text,Button} from "react-native"
// import { useLocalSearchParams } from "expo-router";
// import { getEvent } from "@/services/events";
// import {useQuery} from '@tanstack/react-query'

// export default function Join(){
//     const {id} =useLocalSearchParams<{id:string}>();

//     const {data:event}=useQuery({
//         queryKey:['events',id],
//         queryFn:()=>getEvent(id)
//     })
//     return(
//         <View className="flex-1 p-4 gap-4 items-center justify-center">
//             <Text className='text-neutral-400 text-lg font-bold'>
                
//                You are invited to join
//             </Text>
//             <Text className="text-white text-3xl font-bold">{event?.name}</Text>
       
//        <Button title='Join Event' onPress={()=>{}}/>
//         </View>
//     )
// }

// import { View, Text, Button } from 'react-native';
// import { router, useLocalSearchParams } from 'expo-router';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { getEvent, joinEvent } from '@/services/events';
// import { useAuth } from '@/providers/AuthProvider';

// export default function Join() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const { user } = useAuth();
//   const queryClient = useQueryClient();

//   const { data: event } = useQuery({
//     queryKey: ['events', id],
//     queryFn: () => getEvent(id),
//   });

//   const joinEventMutation = useMutation({
//     mutationFn: () => joinEvent(id, user?.id!),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['events', id] });
//       router.replace(`/events/${id}`);
//     },
//   });

//   return (
//     <View className='flex-1 p-4 gap-6 items-center justify-center'>
//       <Text className='text-neutral-400 text-lg font-bold'>
//         Your are invited to join
//       </Text>
//       <Text className='text-white text-5xl font-bold'>{event?.name}</Text>

//       <Button title='Join Event' onPress={() => joinEventMutation.mutate()} />
//     </View>
//   );
// }


import { View, Text, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getEvent, joinEvent } from '@/services/events';
import { useAuth } from '@/providers/AuthProvider';

export default function Join() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: event } = useQuery({
    queryKey: ['events', id],
    queryFn: () => getEvent(id),
  });

  const joinEventMutation = useMutation({
    mutationFn: () => joinEvent(id, user?.id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events', id] });
      router.replace(`/events/${id}`);
    },
  });

  return (
    <View className='flex-1 p-4 gap-6 items-center justify-center bg-black'>
      <Text className='text-neutral-400 text-lg font-bold'>
        You are invited to join
      </Text>
      <Text className='text-white text-5xl font-bold text-center'>{event?.name}</Text>

      <Pressable 
        className='bg-purple-600 px-8 py-4 rounded-lg active:bg-purple-700'
        onPress={() => {
          console.log('Join button pressed');
          joinEventMutation.mutate();
        }}
        disabled={joinEventMutation.isPending}
      >
        <Text className='text-white text-lg font-semibold'>
          {joinEventMutation.isPending ? 'Joining...' : 'Join Event'}
        </Text>
      </Pressable>
    </View>
  );
}