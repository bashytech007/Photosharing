import { Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import "../../global.css";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import AuthProvider from "../providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // ← Move outside component

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: "Events",
                headerLargeTitle: true,
                headerTransparent: true,
              }}
            />

            <Stack.Screen
              name="events/[id]/index"
              options={{
                title: "Event",
                headerLargeTitle: true,
                headerTransparent: true,
                headerBackButtonDisplayMode: "minimal",
              }}
            />
            {/* <Stack.Screen 
                            name="events/[id]" 
                            options={{title:'Event Details'

                            }} 
                        />
                         */}
            <Stack.Screen
              name="events/[id]/camera"
              options={{
                title: "/events/[id]/camera",
                headerBackButtonDisplayMode: "minimal",
                headerTransparent: true,
                headerBlurEffect: "dark",
                headerRight: () => (
                  <Link href="/" className="mr-2 ml-2">
                    <Ionicons name="share-outline" size={24} color="white" />
                  </Link>
                ),
              }}
            />
              <Stack.Screen
              name="events/[id]/share"
              options={{
                presentation: "modal",
                title: "Share",
              }}
            />
              <Stack.Screen
              name="events/[id]/join"
              options={{
                presentation: "modal",
                title: "Join event",
              }}
            />
            <Stack.Screen
              name="events/create"
              options={{
                presentation: "modal",
                title: "Create Event",
              }}
            />
          </Stack>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
