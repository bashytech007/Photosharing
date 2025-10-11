import { Text, View } from "react-native";
import {Ionicons} from "@expo/vector-icons"
import {Link} from 'expo-router'
import { useEffect } from "react";
import { supabase } from "../lib/supabase";
export default function Page() {
  useEffect(()=>{
    supabase.from('events').select('*,assets(*)').then((data)=>console.log(JSON.stringify(data,null,2)));
  },[]);
  return (
    <View className="flex-1 justify-center items-center gap-4">
     
     
     {/* <Ionicons name="add" size={24} color="white"/> */}
     <Link href="/camera" className="text-white">
      Open Camera
     </Link>
     <Link href="/event" className="text-white">
      Event details
     </Link>
    </View>
  );
}

