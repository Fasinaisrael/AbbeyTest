import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  accountBalance: number;
  loanStatus: "Active" | "Paid" | "None";
  nextPaymentDate: string;
  paymentHistory: PaymentRecord[];
}

interface PaymentRecord {
  amount: number;
  date: string;
  status: "Successful" | "Failed";
}

const mockDatabase: User[] = [
  {
    firstName: "John",
    lastName: "Doe",
    username: "johndoe123",
    password: "password123",
    accountBalance: 25000,
    loanStatus: "Active",
    nextPaymentDate: "2025-04-15",
    paymentHistory: [],
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    username: "janesmith456",
    password: "password456",
    accountBalance: 12500,
    loanStatus: "Paid",
    nextPaymentDate: "N/A",
    paymentHistory: [],
  },
];

export const makePayment = async (amount: number): Promise<boolean> => {
  const username = await AsyncStorage.getItem("currentUser");
  if (!username) return false;

  const user = mockDatabase.find((user) => user.username === username);
  if (!user || user.loanStatus !== "Active") return false;

  if (user.accountBalance < amount) {
    user.paymentHistory.push({ amount, date: new Date().toISOString(), status: "Failed" });
    return false;
  }

  // Deduct payment from balance
  user.accountBalance -= amount;

  // Update payment history
  user.paymentHistory.push({ amount, date: new Date().toISOString(), status: "Successful" });

  // Check if loan is fully paid (for simplicity, we assume a fixed amount of 25,000)
  if (user.accountBalance <= 0) {
    user.loanStatus = "Paid";
    user.nextPaymentDate = "N/A";
  }

  return true;
};

export const registerUser = async (
  firstName: string,
  lastName: string,
  username: string,
  password: string
): Promise<boolean> => {
  const userExists = mockDatabase.some((user) => user.username === username);
  if (userExists) return false;

  const newUser: User = {
    firstName,
    lastName,
    username,
    password,
    accountBalance: 0,
    loanStatus: "None",
    nextPaymentDate: "N/A",
    paymentHistory: [],
  };

  mockDatabase.push(newUser);
  await AsyncStorage.setItem("currentUser", username);
  return true;
};

export const loginUser = async (
  username: string,
  password: string
): Promise<User | null> => {
  const user = mockDatabase.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    await AsyncStorage.setItem("currentUser", username);
  }

  return user || null;
};

export const getUserDetails = async (): Promise<User | null> => {
  const username = await AsyncStorage.getItem("currentUser");
  if (!username) return null;

  return mockDatabase.find((user) => user.username === username) || null;
};

export const logoutUser = async (): Promise<void> => {
  await AsyncStorage.removeItem("currentUser");
};

// Request OTP (mock function)
export const requestOTP = async (otp: string): Promise<boolean> => {
  return otp === "123456";
};

// Reset Password (update current user's password)
export const resetPassword = async (newPassword: string): Promise<boolean> => {
  const username = await AsyncStorage.getItem("currentUser");
  if (!username) return false;

  const user = mockDatabase.find((user) => user.username === username);
  if (user) {
    user.password = newPassword;
    return true;
  }

  return false;
};

// Verify OTP and reset password
export const forgotPassword = async (username: string, otp: string, newPassword: string): Promise<boolean> => {
  const storedOTP = await AsyncStorage.getItem("forgotPasswordOTP");
  const otpUser = await AsyncStorage.getItem("otpUser");

  // Validate OTP and username
  if (otp === storedOTP && otpUser === username) {
    const user = mockDatabase.find((user) => user.username === username);
    if (user) {
      user.password = newPassword;

      // Clean up OTP after use
      await AsyncStorage.removeItem("forgotPasswordOTP");
      await AsyncStorage.removeItem("otpUser");
      return true;
    }
  }

  return false;
};