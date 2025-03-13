import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  Text,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";

interface DashboardComponentProps {
  username: string;
}

const DashboardComponent = ({ username }: DashboardComponentProps) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  // Handle Logout
  const handleLogout = () => {
    setModalVisible(false);
    setShowLogoutConfirmation(false);
    router.replace("/auth/login");
  };

  // Toggle Modal Visibility
  const toggleModal = () => {
    setModalVisible((prev) => !prev);
    setShowLogoutConfirmation(false); // Reset logout confirmation state
  };

  return (
    <View style={styles.navbarContainer}>
      <ThemedText style={styles.navbarTitle}>Dashboard</ThemedText>

      {/* User Icon (Opens Modal) */}
      <TouchableOpacity onPress={toggleModal}>
        <Ionicons name="person-circle" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Combined Modal (User Info & Logout Confirmation) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Icon (Top-Right Corner) */}
            <TouchableOpacity onPress={toggleModal} style={styles.closeIcon}>
              <Ionicons name="close" size={28} color="#002668" />
            </TouchableOpacity>

            {showLogoutConfirmation ? (
              // Logout Confirmation View
              <>
                <Text style={styles.modalText}>
                  Are you sure you want to logout?
                </Text>
                <Button
                  title="Yes, Logout"
                  onPress={handleLogout}
                  color="#d9534f"
                />
                <Button
                  title="Cancel"
                  onPress={() => setShowLogoutConfirmation(false)}
                  color="#666"
                />
              </>
            ) : (
              // User Info View
              <>
                <Text style={styles.modalText}>Username: {username}</Text>

                <Button
                  title="Logout"
                  onPress={() => setShowLogoutConfirmation(true)}
                  color="red"
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DashboardComponent;

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#002668",
    width: "100%",
  },
  navbarTitle: {
    color: "#fff",
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    color: "#002668",
    textAlign: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
