import {Slot,Stack, Tabs,} from "expo-router"
import {DarkTheme,ThemeProvider} from "@react-navigation/native"
import "../../global.css"
import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"
export default function RootLayout(){
    return (
        <ThemeProvider value={DarkTheme}>
           <Stack>
            <Stack.Screen name="index" options={{title:"Events",headerLargeTitle:true}} />
            <Stack.Screen name="camera" options={{title:'Camera', headerBackButtonDisplayMode:'minimal',
                headerTransparent:true,
                headerBlurEffect:'dark',
                headerRight:()=>(
                    <Link href="/" className="mr-2 ml-2">
                        <Ionicons name="share-outline" size={24} color="white"/>
                    </Link>
                )
                }}/>

            </Stack> 
        </ThemeProvider>


    )
}
