import { BrandLogo } from "@/components/ui/BrandLogo";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function NavBar() {
    return <header className="flex py-4 shadow bg-backgroundcolor">
        <nav className="flex items-center gap-10 container">
            <Link className="mr-auto" href="/dashboard">
                <BrandLogo />
            </Link>
            <Link href='/products'>
                Products
            </Link>
            <Link href='/analytics'>
                Analytics
            </Link>
            <Link href='/subscription'>
                Subscription
            </Link>
            <UserButton />
        </nav>
    </header>
}