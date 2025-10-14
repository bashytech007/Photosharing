// import { ActivityIndicator, FlatList, Text, View } from "react-native";

// import { useAuth } from  "../../../providers/AuthProvider"
// import { useQuery } from "@tanstack/react-query";

// import { getEvents } from "@/services/events";
// import EventListitem from "../../../components/EventListItem";

// export default function Page() {
// const {isAuthenticated,user} =useAuth();


// const {data,isLoading,error}=useQuery({
//   queryKey:['events'],
//   queryFn:getEvents,
// })

// if (isLoading){
//   return <ActivityIndicator />
// }
// if (error){
//   return <Text>Error:{error.message}</Text>
// }
//   return (
   
//      <FlatList data={data}
//      contentContainerClassName="gap-4 p-4"
//      renderItem={({item})=>(
//       <EventListitem event={item}/>
//      )}
//      contentInsetAdjustmentBehavior="automatic"
//      />
     
   
//   );
// }


// src/app/events/[id]/index.tsx - Event Details Page
import { View, Text, useWindowDimensions, ActivityIndicator, Pressable, FlatList } from 'react-native'
import React from 'react'
import { Link, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getEvent } from '@/services/events';
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import AssetItem from '@/components/AssetItem';

export default function EventDetails() {
  const { id } = useLocalSearchParams<{id: string}>(); 

  console.log('🔵 Event Details - ID:', id);

  if (!id || Array.isArray(id)) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white">Invalid event ID</Text>
      </View>
    );
  }

  const { data: event, isLoading, error ,isRefetching,refetch} = useQuery({
    queryKey: ['event', id],
    queryFn: () => getEvent(id),
    enabled: !!id,
  })
  
  const { width } = useWindowDimensions();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text className="text-white">Error: {error.message}</Text>
  }

  if (!event) {
    return <Text className="text-white">Event not found</Text>
  }

  return (
    <View className='bg-black flex-1'>
      <Stack.Screen options={{title: event.name,
        
        headerRight:()=>(
          <Link href={`/events/${id}/share`} asChild>
          <Ionicons name='share-outline' size={24} color='white' className='mr-2 ml-2'/>
          </Link>
        )
        }} />
        

      <FlatList
      data={event.assets}
      numColumns={2}
      contentContainerClassName='gap-4 p-4'
      columnWrapperClassName='gap-1'
      renderItem={({item})=><AssetItem asset={item}/>}
      contentInsetAdjustmentBehavior='automatic'
      refreshing={isRefetching}
      onRefresh={refetch}
      />

      <Link href={`/events/${id}/camera`} asChild>
        <Pressable className='bg-white/25 absolute bottom-12 right-4 flex-row items-center justify-center p-6 rounded-full'>
          <Ionicons name='camera-outline' size={40} color='white' />
        </Pressable>
      </Link>
    </View>
  )
}


// import { Text, View } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { Link } from 'expo-router';
// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";
// import type { Session } from "@supabase/supabase-js"; // Use 'type' import

// export default function Page() {
//   const [session, setSession] = useState<Session | null>(null);

//   useEffect(() => {
//     // Get initial session
//     const getSession = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       setSession(session);
//       console.log('Initial session:', JSON.stringify(session, null, 2));
//     };

//     getSession();

//     // Listen for auth changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setSession(session);
//         console.log('Session updated:', JSON.stringify(session, null, 2));
//       }
//     );

//     return () => subscription.unsubscribe();
//   }, []);

//   useEffect(() => {
//     // Only fetch data when session is ready
//     if (session) {
//       supabase
//         .from('events')
//         .select('*,assets(*)')
//         .then((data) => console.log(JSON.stringify(data, null, 2)));
//     }
//   }, [session]);

//   return (
//     <View className="flex-1 justify-center items-center gap-4">
//       <Link href="/camera" className="text-white">
//         Open Camera
//       </Link>
//       <Link href="/event" className="text-white">
//         Event details
//       </Link>
//     </View>
//   );
// }
