import { BrandLogo } from "@/components/ui/BrandLogo";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function NavBar() {
    return <header className="flex py-4 shadow bg-backgroundcolor">
        <nav className="flex items-center gap-10 container">
            <Link className="mr-auto" href="/dashboard">
                <BrandLogo />
            </Link>
            
            <Link href='/dashboard/'>Products</Link>
            <Link href='/dashboard/'>Analytics</Link>
            <Link href='/dashboard/'>Subscription</Link>
            <UserButton />
        </nav>
    </header>
}