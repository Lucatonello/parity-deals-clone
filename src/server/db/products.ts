import { db } from "@/drizzle/db";

export function getProducts(userId: string, { limit }: { limit?: number} ) {
    console.log('userId in getProducts function: ', userId);
    return db.query.ProductTable.findMany({
        where: (({ clerkUserId }, {eq}) => eq(clerkUserId, userId)),
        orderBy: ({ createdAt }, {desc}) => desc(createdAt),
        limit 
    })
}