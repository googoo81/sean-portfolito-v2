type SiteFooterProps = {
  name: string;
};

export function SiteFooter({ name }: SiteFooterProps) {
  return (
    <footer className="relative z-10 border-t border-line py-8 text-center text-xs text-muted">
      © {new Date().getFullYear()} {name}
    </footer>
  );
}
