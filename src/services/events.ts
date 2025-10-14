// import { supabase } from "../lib/supabase";
// export async function getEvent(){
//     const {data}=await supabase.from("events").select("*").throwOnError()
//     return data;
// }


// import { supabase } from "../lib/supabase";
// import { TablesInsert } from "../types/database.types";

// export async function getEvents() {
//   const { data } = await supabase.from("events").select("*").throwOnError();
//   return data;
// }

// export async function getEventsForUser(userId: string) {
//   const { data } = await supabase.from("event_memberships").select(
//     "*, events(*, event_memberships(count))",
//   ).eq(
//     "user_id",
//     userId,
//   ).throwOnError();
//   return data.map((event_membership) => event_membership.events);
// }

// export async function getEvent(id: string) {
//   const { data } = await supabase.from("events").select("*, assets(*)").eq(
//     "id",
//     id,
//   )
//     .throwOnError().single();
//   return data;
// }

// export async function createEvent(
//     newEvent: TablesInsert<"events">,
//     userId: string,
// ) {
//     const { data: eventData, error: eventError } = await supabase.from("events").insert(newEvent)
//         .select().single(); // REMOVE .throwOnError() temporarily for debugging

//     if (eventError) {
//         console.error("EVENT INSERTION FAILED:", eventError); // CHECK THIS IN YOUR CONSOLE
//         throw new Error(eventError.message);
//     }

//     console.log("Successfully created event ID:", eventData.id); // Check that this is a valid UUID

//     // ... rest of the code ...
//     await supabase.from("event_memberships").insert({
//          event_id: eventData.id, 
//          user_id: userId,
//     }).throwOnError();

//     return eventData;
// }

// export async function joinEvent(eventId: string, userId: string) {
//   const { data } = await supabase.from("event_memberships").insert({
//     event_id: eventId,
//     user_id: userId,
//   }).select().single().throwOnError();
//   return data;
// }

import { supabase } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";

export async function getEvents() {
  const { data } = await supabase.from("events").select("*").throwOnError();
  return data;
}

export async function getEventsForUser(userId: string) {
  const { data } = await supabase.from("event_memberships").select(
    "*, events(*, event_memberships(count))",
  ).eq(
    "user_id",
    userId,
  ).throwOnError();
  return data.map((event_membership) => event_membership.events);
}

export async function getEvent(id: string) {
  const { data } = await supabase.from("events").select("*, assets(*)").eq(
    "id",
    id,
  )
    .throwOnError().single();
  return data;
}

export async function createEvent(
  newEvent: TablesInsert<"events">,
  userId: string,
) {
  const { data } = await supabase.from("events").insert(newEvent)
    .select().single().throwOnError();

  await supabase.from("event_memberships").insert({
    event_id: data.id,
    user_id: userId,
  }).throwOnError();

  return data;
}

export async function joinEvent(eventId: string, userId: string) {
  const { data } = await supabase.from("event_memberships").insert({
    event_id: eventId,
    user_id: userId,
  }).select().single().throwOnError();
  return data;
}
