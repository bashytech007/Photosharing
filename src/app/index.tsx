


// import { View, Text, useWindowDimensions, ActivityIndicator,Pressable } from 'react-native'
// import React from 'react'
// import { cloudinary } from '@/lib/cloudinary'
// import { AdvancedImage } from 'cloudinary-react-native';
// import { thumbnail } from "@cloudinary/url-gen/actions/resize"
// import { artisticFilter } from "@cloudinary/url-gen/actions/effect"
// import { Link, useLocalSearchParams } from 'expo-router';
// import { useQuery } from '@tanstack/react-query';
// import { getEvent } from '@/services/events';
// import {Stack} from 'expo-router'
// import { Ionicons } from '@expo/vector-icons';
// export default function EventDetails() {
//   const {id} = useLocalSearchParams<{id:string}>(); 

//   const { data: event, isLoading, error} = useQuery({
//     queryKey: ['event', id],
//     queryFn: () => getEvent(id as string),
//   })
  
//   const { width } = useWindowDimensions();

//   if (isLoading) {
//     return <ActivityIndicator/>;
//   }

//   if (error) {
//     return <Text className="text-white">Error: {error.message}</Text>
//   }

//   if (!event) {
//     return <Text className="text-white">Event not found</Text>
//   }
  
//   // Round dimensions to integers for Cloudinary
//   const imgWidth = Math.round(width);
//   const imgHeight = Math.round(width * (4/3));

//   return (
//     <View className='mt-52 flex-1'>
//       <Stack.Screen options={{title:event.name}}/>
//       {/* <Text className='text-white '>Event: {event.name}</Text> */}
      
//       {/* <AdvancedImage
//         cldImg={cloudinary
//           .image('photo-sharing/yboutt9hgs4gva4dumkh')
//           .resize(thumbnail().height(imgHeight).width(imgWidth))
//           .effect(artisticFilter('peacock'))
//         }
//         className='w-full aspect-[3/4]'
//       /> */}

//     <Link href={`/events/${id}/camera`} asChild>
//       <Pressable className='bg-white/25 absolute bottom-12  right-4 flex-row items-center justify-center p-6 rounded-full'>
//         <Ionicons name='camera-outline' size={40} color='white'/>
//       </Pressable>
//     </Link>
//     </View>
//   )
// }


// src/app/index.tsx - ROOT PAGE (Events List)
// import { ActivityIndicator, FlatList, Pressable, Text, } from "react-native";
// import { useAuth } from "../providers/AuthProvider"
// import { useQuery } from "@tanstack/react-query";
// import { getEvents } from "@/services/events";
// import EventListitem from "../components/EventListItem";
// import { Link } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function EventsPage() {
//   const { isAuthenticated, user } = useAuth();

//   const { data, isLoading, error } = useQuery({
//     queryKey: ['events'],
//     queryFn: getEvents,
//   })

//   if (isLoading) {
//     return <ActivityIndicator />
//   }
  
//   if (error) {
//     return <Text className="text-white">Error: {error.message}</Text>
//   }

//   return (
//     <FlatList 
//       data={data}
//       contentContainerClassName="gap-4 p-4"
//       renderItem={({item}) => <EventListitem event={item} />}
//       contentInsetAdjustmentBehavior="automatic"
//       ListHeaderComponent={()=>(
//         <Link href='/events/create' asChild>
//           <Pressable className="bg-purple-800 p-4 rounded-lg items-center justify-center flex-row">
//             <Ionicons name='add-outline' size={24} color='white'/>
//         <Text className="text-white text-lg font-semibold">Create Event</Text>
//         </Pressable>
//         </Link>
//       )}
//     />
//   );
// }


import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { useAuth } from "../providers/AuthProvider"
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/services/events";
import EventListitem from "../components/EventListItem";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function EventsPage() {
  const { isAuthenticated, user } = useAuth();

  const { data, isLoading, error, isRefetching, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  })

  if (isLoading) {
    return (
      <>
        <Stack.Screen 
          options={{
            title: "Events",
            headerLargeTitle: true,
            headerTransparent: true,
            headerBlurEffect: 'dark',
          }}
        />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="white" />
        </View>
      </>
    )
  }
  
  if (error) {
    return (
      <>
        <Stack.Screen 
          options={{
            title: "Events",
            headerLargeTitle: true,
            headerTransparent: true,
            headerBlurEffect: 'dark',
          }}
        />
        <View className="flex-1 items-center justify-center">
          <Text className="text-white">Error: {error.message}</Text>
        </View>
      </>
    )
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: "Events",
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'dark',
        }}
      />
      
      <FlatList 
        data={data}
        contentContainerClassName="gap-4 p-4"
        renderItem={({item}) => <EventListitem event={item} />}
        contentInsetAdjustmentBehavior="automatic"
        refreshing={isRefetching}
        onRefresh={refetch}
        ListHeaderComponent={() => (
          <View className="mt-24">
          <Pressable 
            className="bg-purple-600 p-4 rounded-lg items-center justify-center flex-row gap-2 mb-4"
            onPress={() => {
              console.log('Navigating to create event...');
              router.push('/events/create');
            }}
          >
            <Ionicons name='add' size={24} color='white'/>
            <Text className="text-white text-lg font-semibold">Create Event</Text>
          </Pressable>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="items-center justify-center p-8 mt-8">
            <Ionicons name="calendar-outline" size={64} color="#666" />
            <Text className="text-white text-xl mt-4">No events yet</Text>
            <Text className="text-gray-400 mt-2 text-center">
              Create your first event to get started
            </Text>
          </View>
        )}
      />
    </>
  )
}