import { db } from "@/drizzle/db";
import { ProductTable, UserSubscriptionTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export function deleteUsers(clerckUserId: string) {
    return db.batch([
        db
          .delete(UserSubscriptionTable)
          .where(eq(UserSubscriptionTable.clerkUserId, clerckUserId)),
        db.delete(ProductTable).where(eq(ProductTable.clerkUserId, clerckUserId))
    ])
}