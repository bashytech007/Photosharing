import { Text, useWindowDimensions } from "react-native";
import { Tables } from "@/types/database.types";
import { AdvancedImage } from "cloudinary-react-native";
import { cloudinary } from "@/lib/cloudinary";
import {thumbnail} from '@cloudinary/url-gen/actions/resize'
import {artisticFilter} from '@cloudinary/url-gen/actions/effect'
export default function AssetItem({asset}:{asset:Tables<'assets'>}){
    const {width}=useWindowDimensions();
     const imgWidth = Math.round(width);
  const imgHeight = Math.round(width * (4/3)/2);
    return   (
         <AdvancedImage
        cldImg={cloudinary
          .image(asset.asset_id!)
          .resize(thumbnail().height(imgHeight).width(imgWidth))
          .effect(artisticFilter('peacock'))
        }
        className='w-full aspect-[3/4]'
      />
    )
}