import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator, ScrollView, SafeAreaView, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { getUserDetails, makePayment } from "@/utils/mock";
import DashboardComponent from "@/components/DashboardComponent";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  accountBalance: number;
  loanStatus: "Active" | "Paid" | "None";
  nextPaymentDate: string;
}

export default function DashboardScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentAmount, setPaymentAmount] = useState<string>("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await getUserDetails();
        if (userData) {
          setUser(userData);
        } else {
          Alert.alert("Error", "No user data found");
          router.replace("/auth/login");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        Alert.alert("Error", "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    Alert.alert("Logout", "You have been logged out");
    router.replace("/auth/login");
  };

  const handlePayment = async () => {
    if (!paymentAmount || isNaN(Number(paymentAmount))) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    const amount = parseFloat(paymentAmount);
    if (amount <= 0) {
      Alert.alert("Error", "Payment amount must be greater than zero");
      return;
    }

    const success = await makePayment(amount);
    if (success) {
      Alert.alert("Success", "Payment completed successfully");
      const updatedUser = await getUserDetails();
      setUser(updatedUser);
      setPaymentAmount("");
    } else {
      Alert.alert("Error", "Payment failed. Check your balance or loan status");
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#002668" />
      </View>
    );
  }

  if (!user) return <Text>Loading failed. Please try again.</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <DashboardComponent username={user.username} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>
          Welcome, {user.firstName} {user.lastName}
        </Text>

        {/* Account Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Summary</Text>
          <Text style={styles.info}>Balance: ${user.accountBalance.toFixed(2)}</Text>
          <Text style={styles.info}>Loan Status: {user.loanStatus}</Text>
          <Text style={styles.info}>Next Payment: {user.nextPaymentDate}</Text>
        </View>

        {/* User Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>User Information</Text>
          <Text style={styles.info}>Name: {user.firstName} {user.lastName}</Text>
          <Text style={styles.info}>Username: {user.username}</Text>
        </View>

        {/* Make Payment */}
        {user.loanStatus === "Active" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Make a Payment</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={paymentAmount}
              onChangeText={setPaymentAmount}
            />
            <Button title="Pay Now" onPress={handlePayment} color="#002668" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#002668",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#002668",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "#444",
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#002668",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
