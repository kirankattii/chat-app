import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "@/assets/styles/Avatar.styles";
import { Background } from "@react-navigation/elements";
import { Colors } from "@/constants/Colors";

interface AvatarProps {
  name: string;
  size?: number;
  online?: boolean;
  src?: string;
}

const PALETTE = [
  "#FFB300",
  "#FF7043",
  "#AB47BC",
  "#64B5F6",
  "#26C6DA",
  "#81C784",
  "#A5D6A7",
];

export default function Avatar({ name, size = 40, online, src }: AvatarProps) {
  const color = PALETTE[name.charCodeAt(0) % PALETTE.length];

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const indicatorSize = Math.round(size * 0.28);

  return (
    <View style={[styles.root, { width: size, height: size }]}>
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: src ? "transparent" : color,
          },
        ]}
      >
        {src ? (
          <Image
            source={{ uri: src }}
            style={{ width: size, height: size, borderRadius: size / 2 }}
          />
        ) : (
          <Text style={[styles.initials, { fontSize: size * 0.38 }]} />
        )}
      </View>
      {online !== undefined && (
        <View
          style={[
            styles.indicator,
            {
              width: indicatorSize,
              height: indicatorSize,
              borderRadius: indicatorSize / 2,
              backgroundColor: online ? "green" : "gray",
              bottom: 0,
              right: 0,
            },
          ]}
        />
      )}
    </View>
  );
}
