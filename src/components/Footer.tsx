export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a href="#" className="font-serif text-2xl tracking-tight text-foreground">
            Hvile
          </a>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <a href="#philosophy" className="hover:text-foreground transition-colors duration-300">
              Философия
            </a>
            <a href="#features" className="hover:text-foreground transition-colors duration-300">
              Возможности
            </a>
            <a href="#pricing" className="hover:text-foreground transition-colors duration-300">
              Тарифы
            </a>
            <a href="#" className="hover:text-foreground transition-colors duration-300">
              Политика
            </a>
            <a href="#" className="hover:text-foreground transition-colors duration-300">
              Условия
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">2026 Hvile. Все права защищены.</p>
        </div>

        {/* Large decorative logo */}
        <div className="mt-20 text-center">
          <span className="font-serif text-[12rem] md:text-[16rem] leading-none text-border/50 select-none">H</span>
        </div>
      </div>
    </footer>
  );
}
