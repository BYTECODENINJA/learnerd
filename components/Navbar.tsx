'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

const navLinks = [
    {label: 'Library', href: '/'},
    {label: 'Add New', href: '/books/new'},
]
const Navbar = () => {

    const pathName = usePathname();
    return (
        <header className="w-full fixed z-50 bg-[#abc4e6]">
            <div className="wrapper navbar-height py-4 flex justify-between items-center">
                <Link href="/" className="flex gap-0.5 items-center">
                    <h1 className="font-logo text-[32px]">LEARNERD</h1>
                </Link>

                <nav className="w-fit flex gap-7.5 items-center">
                    {navLinks.map(({ label, href }) => {
                        const isActive = pathName === href || (href !== '/' &&
                        pathName.startsWith(href));

                        return (
                            <Link key={href} href={href} className={cn('nav-link-base',
                            isActive? 'nav-link-active' : 'text-white hover:opacity-75',)}>
                                {label}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </header>
    )
}
export default Navbar
