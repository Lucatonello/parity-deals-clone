import { auth } from '@clerk/nextjs/server'
import { getProducts } from '@/server/db/products'
import { NoProducts } from './_components/NoProducts'

export default async function Page() {
    const { userId }: { userId: string | null } = await auth()

    if (!userId) return null

    const products = await getProducts(userId, { limit: 6 })

    if (products.length === 0) return <NoProducts />

    return <h1>Hello, {userId}</h1>
}