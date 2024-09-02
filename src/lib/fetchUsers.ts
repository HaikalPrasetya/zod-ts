import { UserSchemaWithAddress, UserWithAddress } from "../models/User";
import { z } from "zod";

const UserResults = z.array(UserSchemaWithAddress);

type UserArray = UserWithAddress[];

export default async function fetchUsers(): Promise<UserArray | undefined> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) return undefined;
    const usersJson: UserArray = await res.json();
    const parsedData = UserResults.parse(usersJson);
    console.log(parsedData);
    return parsedData;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
