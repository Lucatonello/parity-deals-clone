"use server";

import { productDetailsSchema } from "@/schemas/products";
import { auth } from "@clerk/nextjs/server";
import { 
    createProduct as createProductDb, 
    deleteProduct as deleteProductDb, 
    updateProduct as updateProductDb
} from "@/server/db/products"

import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function createProduct(unsafeData: z.infer<typeof productDetailsSchema>) {
    const { userId } = auth()
    const { success, data } =  productDetailsSchema.safeParse(unsafeData)

    if (userId === null) {
        return { 
            error: true, 
            message: 'There was an error creating your product. userId is null' 
        }
    } else if (!success) {
        return { 
            error: true, 
            message: 'There was an error creating your product. Request was unsuccesful' 
        }
    }

    const { id } = await createProductDb({ ...data, clerkUserId: userId })

    redirect(`/dashboard/products/${id}/edit?tab=countries`)
}

export async function updateProduct(id: string, unsafeData: z.infer<typeof productDetailsSchema>) {
    const { userId } = auth()   
    const { success, data } =  productDetailsSchema.safeParse(unsafeData)
    const errorMessage = 'There was an error updating your product'

    if (!success || userId === null) {
        return { 
            error: true, 
            message: errorMessage
        }
    }

    const isSucces = await updateProductDb(data, { id, userId })

    return { 
        error: !isSucces, 
        message: isSucces ? 'Product updated succesfully' : errorMessage 
    }
}

export async function deleteProduct(id: string) {
    const { userId } = auth()
    const errorMessage = 'There was an error deleting your product'

    if (userId === null) return {
        error: true,
        message: errorMessage
    }

    const isSucces = await deleteProductDb({ id, userId });
        
    return { error: !isSucces, message: isSucces ? "Succesfully deleted your product" : errorMessage }
}