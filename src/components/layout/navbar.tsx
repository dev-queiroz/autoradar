import Link from "next/link";
import { Car } from "lucide-react";
import { siteConfig } from "@/config/site";
import { navigation } from "@/constants/navigation";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <Car className="h-6 w-6" />
                        <span>{siteConfig.name}</span>
                    </Link>

                    <nav
                        aria-label="Navegação principal"
                        className="flex items-center gap-6"
                    >
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                    </div>
                </div>
            </Container>
        </header>
    );
}