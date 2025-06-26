import Fab from "@/components/Fab"
import React from "react"
import { ScrollView, Text, View } from "react-native"

export default function Search() {
  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Search</Text>
        </View>
      </ScrollView>
      <Fab />
    </>
)
}
