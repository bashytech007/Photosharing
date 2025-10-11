// import { View, Text } from 'react-native'
// import React from 'react'
// import { AdvancedImage } from 'cloudinary-react-native'
// import { cloudinary } from '../lib/cloudinary'
// const event = () => {
//   return (
//     <View className=''>
//       <Text className='text-white'>Event</Text>
//       <AdvancedImage
//       cldImg={cloudinary.image('yboutt9hgs4gva4dumkh')}
//       width={200}
//       height={200}
//       />
//     </View>
//   )
// }

// export default event

// import { View, Text } from 'react-native'
// import React from 'react'
// import { AdvancedImage } from 'cloudinary-react-native'
// import { cloudinary } from '../lib/cloudinary'

// const Event = () => {
//   return (
//     <View className=''>
//       <Text className='text-white'>Event</Text>
//       <AdvancedImage
//         cldImg={cloudinary.image('yboutt9hgs4gva4dumkh')}
//         style={{ width: 200, height: 200 }}
//       />
//     </View>
//   )
// }

// export default Event

// import { View, Text, Image, useWindowDimensions } from 'react-native'
// import React from 'react'
// import { cloudinary } from '../lib/cloudinary'
// import { AdvancedImage } from 'cloudinary-react-native';
// import {thumbnail} from "@cloudinary/url-gen/actions/resize"
// import { ArtisticFilter } from '@cloudinary/url-gen/qualifiers';
// import {artisticFilter} from "@cloudinary/url-gen/actions/effect"
// const Event = () => {
// const {width} =useWindowDimensions();
  
//   return (
//     <View className=''>
//       <Text className='text-white '>Event</Text>
      
//       <AdvancedImage
//       cldImg={cloudinary.image('photo-sharing/yboutt9hgs4gva4dumkh').resize(
//         thumbnail().height(width * (4/3)
//     ).width(width)).effect(artisticFilter('incognito')
//     )}
//        className='w-full aspect-[3/4]'
//         // resizeMode="cover"
//       />
//     </View>
//   )
// }

// export default Event

import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import { cloudinary } from '../lib/cloudinary'
import { AdvancedImage } from 'cloudinary-react-native';
import { fill } from "@cloudinary/url-gen/actions/resize"
import { artisticFilter } from "@cloudinary/url-gen/actions/effect"

export default function Event() {
  const { width } = useWindowDimensions();
  
  return (
    <View className='flex-1 bg-black'>
      <Text className='text-white text-2xl p-4'>Event</Text>
      
      <AdvancedImage
        cldImg={cloudinary
          .image('photo-sharing/yboutt9hgs4gva4dumkh')
          .resize(fill().height(Math.round(width * (4/3))).width(Math.round(width)))
          .effect(artisticFilter('peacock')) // Change 'athena' to any valid filter
        }
        className='w-full aspect-[3/4]'
      />
    </View>
  )
}