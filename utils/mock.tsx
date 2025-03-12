// mockAuth.ts

interface User {
  username: string;
  password: string;
}

const mockDatabase: User[] = [];

// Register a new user
export const registerUser = async (
  username: string,
  password: string
): Promise<boolean> => {
  const userExists = mockDatabase.some((user) => user.username === username);
  if (userExists) return false;

  mockDatabase.push({ username, password });
  return true;
};

// Login user
export const loginUser = async (
  username: string,
  password: string
): Promise<User | null> => {
  const user = mockDatabase.find(
    (user) => user.username === username && user.password === password
  );
  return user || null;
};

// Request OTP (mock function)
export const requestOTP = async (otp: string): Promise<boolean> => {
  // Mock OTP validation (always accepts '123456')
  return otp === "123456";
};

// Reset Password
export const resetPassword = async (newPassword: string): Promise<boolean> => {
  if (!mockDatabase.length) return false;

  // Reset password for the first user (mocked behavior)
  mockDatabase[0].password = newPassword;
  return true;
};
