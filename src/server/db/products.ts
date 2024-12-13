'use server';

import { db } from "@/drizzle/db";
import { ProductCustomizationTable, ProductTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getProducts(userId: string, { limit }: { limit?: number} ) {
    console.log('userId in getProducts function: ', userId);
    return db.query.ProductTable.findMany({
        where: (({ clerkUserId }, {eq}) => eq(clerkUserId, userId)),
        orderBy: ({ createdAt }, {desc}) => desc(createdAt),
        limit 
    })
}
export async function createProduct(data: typeof ProductTable.$inferInsert) {
    const [newProduct] = await db
      .insert(ProductTable)
      .values(data)
      .returning({ id: ProductTable.id, userId: ProductTable.clerkUserId })
  
    try {
      await db
        .insert(ProductCustomizationTable)
        .values({
          productId: newProduct.id,
        })
        .onConflictDoNothing({
          target: ProductCustomizationTable.productId,
        })
    } catch (e) {
      await db.delete(ProductTable).where(eq(ProductTable.id, newProduct.id))
    }

    return newProduct
}