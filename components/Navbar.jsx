import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { Bars3Icon, XMarkIcon } from "react-native-heroicons/outline";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const routes = [
  { name: "Home", path: "/" },
  { name: "Profile", path: "/profile" },
  { name: "Friends", path: "/friends" },
  { name: "Water", path: "/watering" },

];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navigateTo = (path) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.navbar}>
        <Link href="/" asChild>
          <TouchableOpacity>
            <Text style={styles.logo}>BLOSM</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Bars3Icon size={24} color="#5E9020" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={menuOpen}
        onRequestClose={toggleMenu}
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
                <XMarkIcon size={24} color="#5E9020" />
              </TouchableOpacity>
            </View>
            {routes.map((route) => (
              <TouchableOpacity
                key={route.path}
                onPress={() => navigateTo(route.path)}
                style={styles.menuItem}
              >
                <Text style={styles.menuItemText}>{route.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  logo: {
    color: "#5E9020",
    fontSize: 32,
    fontFamily: "NerkoOne",
  },
  menuButton: {
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  modalContent: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 32,
    paddingVertical: 16,
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
