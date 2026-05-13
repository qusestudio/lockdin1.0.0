import {FlatList, StyleSheet, Text, View} from 'react-native';

import {SafeAreaView} from "react-native-safe-area-context";
import SearchBar from "@/components/search-bar";
import RoomCard from "@/components/room-card";
import {useRouter} from "expo-router";

interface Room {
  id: string
  subject: string
  grade: string
}

const rooms: Room[] = [
  { id: '1', subject: 'Pure Mathematics', grade: 'Grade 10' },
  { id: '2', subject: 'Life Sciences', grade: 'Grade 10' },
  { id: '3', subject: 'Physical Sciences', grade: 'Grade 10' },
  { id: '4', subject: 'English Home Language', grade: 'Grade 10' },
  { id: '5', subject: 'History', grade: 'Grade 10' },
  { id: '6', subject: 'Geography', grade: 'Grade 10' },
  { id: '7', subject: 'Information Technology', grade: 'Grade 10' },
  { id: '8', subject: 'Maths Lit', grade: 'Grade 10' },
  { id: '9', subject: 'Geography', grade: 'Grade 10' },
  { id: '10', subject: 'Geography', grade: 'Grade 10' },
  { id: '11', subject: 'Geography', grade: 'Grade 10' },
  { id: '12', subject: 'Geography', grade: 'Grade 10' },
]

export default function DiscoverRoomsScreen() {
  const router = useRouter();

  return (
      <SafeAreaView style={styles.safeAreaContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', padding: 2 }}>
            <Text style={{ fontFamily: "DT Getai Grotesk Display Black", fontSize: 25 }}>
              Lockdin
            </Text>
            <Text style={{  fontSize: 18, marginTop: -2, fontFamily: "DT Getai Grotesk Display Black" }}>®</Text>
          </View>
          <SearchBar />
          <View>
            {/*<Text style={{fontFamily: "Geist", fontSize: 15}}>Rooms</Text>*/}
            <FlatList
                style={styles.list}
                data={rooms}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <RoomCard
                        subject={item.subject}
                        grade={item.grade}
                        onJoin={() => router.push(`/room/${item.id}`, )}
                    />
                )}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
          </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
    marginBottom: 90,
  },
  safeAreaContainer: {
    flex: 1,
    padding: 20,
    gap: 5,
    backgroundColor: "#fff",
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
