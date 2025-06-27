// import { supabase } from "@/authen/supabase";
// import { text } from "express";
// import React, { useState } from "react";
// import {
//   Button,
//   FlatList,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";

// export default function TestSceen() {
//   // type Listing = {
//   //   id: number;
//   //   uid: string;
//   //   image_url: string;
//   //   title: string;
//   //   created_at: string;
//   // };
//   const [messages, setListing] = useState<any[]>([]);

//   const fetchData = async () => {
//     const { data, error } = await supabase.from("chats").select("*");

//     if (error) {
//       console.log(error.message);
//     } else {
//       setListing(data);
//       console.log(data);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <Text
//             style={{
//               // alignSelf:
//               //   item.sender_id === currentUserId ? "flex-end" : "flex-start",
//               // backgroundColor:
//               //   item.sender_id === currentUserId ? "#dcf8c6" : "#f1f1f1",
//               marginVertical: 4,
//               padding: 10,
//               borderRadius: 10,
//               maxWidth: "80%",
//             }}
//           >
//             {item.content}
//           </Text>
//         )}
//       />

//       <View style={styles.inputRow}>
//         <TextInput
//           value={text}
//           onChangeText={setText}
//           style={styles.input}
//           placeholder="Type a message"
//         />
//         <Button title="Send" onPress={sendMessage} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10 },
//   inputRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     marginRight: 10,
//   },
// });
// // return (
// //     <TouchableOpacity >
// //       <View style={styles.functionBox}>
// //         <Feather name="heart" size={24} style={styles.icons} />
// //         <Text style={styles.boxText}>Favourtes</Text>
// //         <Feather
// //           name="chevron-right"
// //           size={24}
// //           color={"green"}
// //           style={{ paddingRight: 15 }}
// //         />
// //         <Image
// //           source={{
// //             uri: "https://adzwyoignwrwrmtndhsn.supabase.co/storage/v1/object/public/listing-images/1750590963959.jpg",
// //           }}
// //           style={{ width: 200, height: 200, borderRadius: 10 }}
// //         />
// //       </View>

// //       <FlatList
// //         data={listing}
// //         keyExtractor={(item, index) => item.id?.toString() || index.toString()}
// //         renderItem={({ item }) => (
// //           <View style={{ marginBottom: 20 }}>
// //             <Image
// //               source={{
// //                 uri: item.image_url,
// //               }}
// //               style={{ width: 200, height: 200 }}
// //               onLoadStart={() => console.log("Loading image...")}
// //               onLoadEnd={() => console.log("Image loaded")}
// //               onError={() => console.log("Image failed to load")}
// //             />

// //             <Text>{item.item}</Text>
// //             <Text style={{ color: "gray" }}>{item.description}</Text>
// //           </View>
// //         )}
// //       />
// //     </TouchableOpacity>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   darkStyle: { backgroundColor: "black" },
// //   lightStyle: { backgroundColor: "white" },
// //   darkText: { color: "black" },
// //   lightText: { color: "white" },
// //   container: {
// //     flex: 1,
// //     alignItems: "center",
// //   },
// //   titleBox: { alignItems: "center", marginTop: 20 },
// //   titleText: { fontWeight: "bold", fontSize: 20 },

// //   picBox: { alignItems: "center", marginTop: 20 },
// //   circleOutside: {
// //     height: 150,
// //     width: 150,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     borderColor: "green",
// //     padding: 0,
// //     borderRadius: 75,
// //   },
// //   circleInside: {
// //     height: 145,
// //     width: 145,
// //     borderRadius: 100,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   circleOutside2: {
// //     height: 120,
// //     width: 120,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     borderColor: "green",
// //     padding: 0,

// //     borderRadius: 75,
// //   },
// //   circleInside2: {
// //     height: 115,
// //     width: 115,
// //     borderRadius: 100,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   circletrans: {
// //     height: 100,
// //     width: 100,
// //     borderColor: "#f6f6f6",
// //     borderWidth: 2,
// //     borderRadius: 100,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   picture: {
// //     height: 100,
// //     width: 100,
// //   },
// //   profilePic: { height: 70, resizeMode: "contain", borderRadius: 100 },

// //   functionBox: {
// //     // backgroundColor: "#aaaaaa",
// //     width: 400,
// //     height: 60,
// //     // borderWidth: 1,
// //     borderColor: "grey",
// //     borderRadius: 10,
// //     // marginTop: 20,
// //     alignItems: "center",
// //     // justifyContent: "space-between",
// //     flexDirection: "row",
// //   },
// //   boxText: {
// //     alignSelf: "center",
// //     fontSize: 15,
// //     fontWeight: "bold",
// //     paddingLeft: 20,
// //     marginRight: 170,

// //     width: 130,
// //   },
// //   icons: {
// //     color: "#E2D7AB",
// //     marginLeft: 15,
// //     backgroundColor: "#0F4415",
// //     borderWidth: 10,
// //     borderRadius: 100,
// //     borderColor: "#0F4415",
// //   },
// // });
