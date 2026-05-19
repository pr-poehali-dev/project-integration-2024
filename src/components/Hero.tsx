import Icon from "@/components/ui/icon";
import { QrScanner } from "@/components/QrScanner";
import { usePoints } from "@/context/PointsContext";

export function Hero() {
  const { points } = usePoints();
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Subtle badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 text-sage mb-8">
          <span className="w-2 h-2 rounded-full bg-sage" />
          <span className="text-sm">Сортируй мусор — получай бонусы</span>
        </div>

        {/* Points counter */}
        {points > 0 && (
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6 transition-all duration-500">
            <Icon name="Coins" size={18} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              Ваши баллы: <span className="text-primary font-bold">{points}</span>
            </span>
          </div>
        )}

        {/* Main heading with serif font */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground leading-[1.1] text-balance mb-8">
          Делай добро —
          <br />
          <span className="italic">зарабатывай баллы</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
          ЭкоБонус — приложение, которое превращает правильную сортировку мусора в реальные деньги. Найди мусорку, отсканируй QR-код, выбери категорию и открой нужную урну.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full text-base hover:opacity-90 transition-all duration-300"
          >
            Скачать приложение
            <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <QrScanner />
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-border" />
      </div>
    </section>
  );
}