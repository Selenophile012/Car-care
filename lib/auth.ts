
export type UserAccount = {
  name: string;
  email: string;
  password: string;
};

export type UserSession = {
  name: string;
  email: string;
  action: "registered" | "logged-in";
};

const USERS_KEY = "carcare-users";
const SESSION_KEY = "carcare-user";

function readUsers(): UserAccount[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? (JSON.parse(stored) as UserAccount[]) : [];
  } catch {
    return [];
  }
}

export function getCurrentUser(): UserSession | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? (JSON.parse(stored) as UserSession) : null;
  } catch {
    return null;
  }
}

export function registerUser(
  name: string,
  email: string,
  password: string,
): { success: boolean; message: string } {
  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const newUser: UserAccount = {
    name: name.trim(),
    email: normalizedEmail,
    password,
  };

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      name: newUser.name,
      email: newUser.email,
      action: "registered",
    } satisfies UserSession),
  );

  return { success: true, message: "Account created successfully." };
}

export function loginUser(
  email: string,
  password: string,
): { success: boolean; message: string; name?: string } {
  const normalizedEmail = email.trim().toLowerCase();

  const user = readUsers().find(
    (account) =>
      account.email.toLowerCase() === normalizedEmail &&
      account.password === password,
  );

  if (!user) {
    return {
      success: false,
      message: "Incorrect email or password, or you need to register first.",
    };
  }

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      name: user.name,
      email: user.email,
      action: "logged-in",
    } satisfies UserSession),
  );

  return {
    success: true,
    message: "Login successful.",
    name: user.name,
  };
}
export function logoutUser(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(SESSION_KEY);
}