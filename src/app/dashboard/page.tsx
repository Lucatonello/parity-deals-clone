import { getProducts } from '@/server/db/products';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
    const { userId, isLoaded, isSignedIn } = useAuth();
    const [products, setProducts] = useState<any>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            setError('User is not signed in');
            return;
        }


        const fetchProducts = async () => {
            const response = await getProducts(userId, { limit: 6 });
            setProducts(response);
        }

        fetchProducts();
        console.log('User ID:', userId, 'Products: ', products);
    }, [isLoaded, isSignedIn, userId, products]);

    if (error) {
        return <div>{error}</div>;
    }

    return <div></div>;
}
