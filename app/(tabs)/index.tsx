import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';

import {SafeAreaView} from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import SearchBar from "@/components/search-bar";
import RoomCard from "@/components/room-card";

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
  { id: '5', subject: 'History', grade: 'Grade 11' },
  { id: '6', subject: 'Geography', grade: 'Grade 12' },
]

export default function HomeScreen() {



  return (
      <SafeAreaView style={styles.safeAreaContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', padding: 2 }}>
            <Text style={{ fontFamily: "DT Getai Grotesk Display Black", fontSize: 25 }}>
              Lockdin
            </Text>
            <Text style={{  fontSize: 18, marginTop: -2, fontFamily: "DT Getai Grotesk Display Black" }}>®</Text>
          </View>
          <SearchBar />
          <View style={{ marginTop: 20 }}>
            <Text style={{fontFamily: "Geist", fontSize: 15}}>Rooms</Text>
            <FlatList
                data={rooms}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <RoomCard
                        subject={item.subject}
                        grade={item.grade}
                        onJoin={() => console.log(`Joined ${item.subject}`)}
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
  },
  safeAreaContainer: {
    flex: 1,
    padding: 20,
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
