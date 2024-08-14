import { Text, View } from "react-native";
import "../global.css";

export default function Index() {
  return (
    <View>
      <Text className={"text-5xl text-blue-500 text-center"}>
        If you see some large blue text, tailwind is working!
      </Text>
    </View>
  );
}
