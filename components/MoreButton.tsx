import { Colors } from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import * as Clipboard from "expo-clipboard"
import React from "react"
import { Text, TouchableOpacity } from "react-native"
import { toast } from "sonner-native"
import * as DropdownMenu from "zeego/dropdown-menu"

type MoreButtonProps = {
  pageName: string
}

export default function MoreButton({ pageName }: MoreButtonProps) {
  const copyToClipboard = async () => {
    const path = `todoist://(authenticated)/(tabs)/${pageName.toLowerCase()}`
    await Clipboard.setStringAsync(path)
    toast.success('Copied to clipboard')
  }
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <TouchableOpacity className="p-4" activeOpacity={0.5}>
          {/* <Text>{pageName}</Text> */}
          <Ionicons name="ellipsis-horizontal-outline" size={28} color={Colors.primary}/>
        </TouchableOpacity>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item key="link" onSelect={copyToClipboard}>
          <DropdownMenu.ItemTitle>Copy</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{
              name: "link",
              pointSize: 24,
            }}
            androidIconName="link"
          ></DropdownMenu.ItemIcon>
        </DropdownMenu.Item>
        <DropdownMenu.Group>
          <DropdownMenu.Item key="select">
            <DropdownMenu.ItemTitle>Select Tasks</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "square.stack",
                pointSize: 24,
              }}
              androidIconName="square"
            ></DropdownMenu.ItemIcon>
          </DropdownMenu.Item>
          <DropdownMenu.Item key="view">
            <DropdownMenu.ItemTitle>View</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "slider.horizontal.3",
                pointSize: 24,
              }}
              androidIconName="slider.horizontal.3"
            ></DropdownMenu.ItemIcon>
          </DropdownMenu.Item>
          <DropdownMenu.Item key="log">
            <DropdownMenu.ItemTitle>Activity Log</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "chart.xyaxis.line",
                pointSize: 24,
              }}
              androidIconName="chart"
            ></DropdownMenu.ItemIcon>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
