import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 text-center text-sm text-muted">
      © {new Date().getFullYear()} {profile.nameEn}
    </footer>
  );
}
