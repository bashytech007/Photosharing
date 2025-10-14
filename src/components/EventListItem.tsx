// import { View, Text, Pressable } from 'react-native'
// import React from 'react'
// import { Tables } from '../types/database.types'
// import { Link } from 'expo-router';
// type Event =Tables<'events'>;

// type EventListItemProps={
//     event:Event;
// }

// const EventListitem = ({event}:EventListItemProps) => {
//   return (
//     <Link href={`/events/${event.id}`} asChild>
//     <Pressable className='bg-neutral-800 p-4 rounded-lg'
//     onPress={() => console.log('👆 Pressed, navigating to:', href)}

//     >
//     <Text className='text-white text-4xl font-bold'>{event.name}</Text>
//     </Pressable>
//     </Link>
//   )
// }

// export default EventListitem  


import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Tables } from '../types/database.types'
import { Link } from 'expo-router';

type Event = Tables<'events'>;

type EventListItemProps = {
    event: Event;
}

const EventListitem = ({event}: EventListItemProps) => {
  const linkHref = `/events/${event.id}` as const;
  console.log('🔗 Link href:', linkHref);
  
  return (
    <Link href={linkHref} asChild>
      <Pressable 
        className='bg-neutral-800 p-4 rounded-lg'
        onPress={() => console.log('👆 Pressed, navigating to:', linkHref)}
      >
        <Text className='text-white text-4xl font-bold'>{event.name}</Text>
      </Pressable>
    </Link>
  )
}

export default EventListitem

// used to debug 

// import { View, Text, Pressable } from 'react-native'
// import React from 'react'
// import { Tables } from '../types/database.types'
// import { Link, router } from 'expo-router';

// type Event = Tables<'events'>;

// type EventListItemProps = {
//     event: Event;
// }

// const EventListitem = ({event}: EventListItemProps) => {
//   console.log('🔵 Rendering event:', event.id, event.name);
  
//   return (
//     <Pressable 
//       className='bg-neutral-800 p-4 rounded-lg'
//       onPress={() => {
//         console.log('🟢 PRESSED:', event.id);
//         router.push(`/events/${event.id}`);
//       }}
//     >
//       <Text className='text-white text-4xl font-bold'>{event.name}</Text>
//     </Pressable>
//   )
// }

// export default EventListitem