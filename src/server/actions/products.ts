"use server";

import { productDetailsSchema } from "@/schemas/products";
import { auth } from "@clerk/nextjs/server";
import { createProduct as createProductDb} from "@/server/db/products"
import { redirect } from "next/navigation";
import { z } from "zod";

export async function CreateProduct(unsafeData: z.infer<typeof productDetailsSchema>) {
    const { userId } = await auth()
    const { success, data } =  productDetailsSchema.safeParse(unsafeData)
    console.log('userId', userId) 
    if (userId === null) {
        return { error: true, message: 'There was an error creating your product. userId is null' }
    } else if (!success) {
        return { 
            error: true, 
            message: 'There was an error creating your product. Request was unsuccesful' 
        }
    }

    console.log('data action: ', data, 'userId action: ', userId);
    const { id } = await createProductDb({ ...data, clerkUserId: userId })

    redirect(`/dashboard/products/${id}/edit?tab=countries`)
}