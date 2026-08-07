import Link from "next/link";

import { Container } from "./container";
import { siteConfig } from "../../config/site";

export function Footer() {
  return (
    <footer className="border-t">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>

          <div className="flex items-center gap-6">
            <Link
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </Link>

            <Link
              href={siteConfig.license}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              MIT License
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}