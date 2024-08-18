import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { UserCircleIcon } from "react-native-heroicons/solid";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => router.replace("/profiles/asd");

  const navigateTo = (path) => {
    router.replace(path);
    setMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Link href="/dashboard" asChild>
          <TouchableOpacity>
            <Text style={styles.logo}>BLOSM</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <UserCircleIcon size={24} color="#5E9020" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  logo: {
    color: "#5E9020",
    fontSize: 32,
    fontFamily: "NerkoOne",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    marginTop: 64,
  },
  modalContent: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 32,
  },
  closeButton: {
    padding: 8,
  },
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    marginHorizontal: 32,
  },
  menuItemText: {
    fontSize: 14,
    color: "#5E9020",
    fontFamily: "Montserrat",
  },
});
