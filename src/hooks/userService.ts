// userService.ts
export interface User {
  email: string;
  password: string;
  displayName: string;
}

export const saveUser = (user: User) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const findUserByEmail = (email: string): User | undefined => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.find((user: User) => user.email === email);
};
