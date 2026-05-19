import Icon from "@/components/ui/icon";

const features = [
  {
    icon: "QrCode",
    title: "QR-сканирование",
    description: "Наводите камеру на код — приложение мгновенно определяет мусорку и открывает нужный контейнер без лишних действий.",
  },
  {
    icon: "Layers",
    title: "4 категории отходов",
    description: "Бумага, стекло, пластик, пищевые отходы — каждая категория получает свою урну. Всё чётко и понятно.",
  },
  {
    icon: "Coins",
    title: "Бонусы за каждый визит",
    description: "Баллы начисляются автоматически при каждой правильной сортировке. Накапливайте и выводите реальные деньги.",
  },
  {
    icon: "MapPin",
    title: "Карта мусорок рядом",
    description: "Встроенная карта показывает ближайшие умные контейнеры — всегда знаете, куда идти с пакетом.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-sm uppercase tracking-widest text-terracotta mb-4 block">Возможности</span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground text-balance">
            Всё необходимое — в одном приложении
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 md:p-10 rounded-2xl bg-card border border-border hover:border-sage/30 transition-colors duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center mb-6 group-hover:bg-sage/20 transition-colors duration-500">
                <Icon name={feature.icon} size={24} className="text-sage" fallback="Sparkles" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
