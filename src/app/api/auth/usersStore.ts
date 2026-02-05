import bcrypt from "bcryptjs";

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
};

let users: User[] = [];

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

export async function createUser(
  email: string,
  password: string,
  name?: string
) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user: User = {
    id: crypto.randomUUID(),
    email,
    passwordHash,
    name,
  };

  users.push(user);

  return user;
}
