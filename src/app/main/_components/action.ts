import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const getUserById = async (userId: string) => {
  "use server";
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.displayId, userId),
    columns: {
      id: false,
      displayId: false,
      hashedPassword: false,
      provider: false,
    },
  });
  return user;
};
