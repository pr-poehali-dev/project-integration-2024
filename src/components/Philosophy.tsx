export function Philosophy() {
  return (
    <section id="philosophy" className="py-32 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative aspect-[4/5] bg-muted rounded-lg overflow-hidden">
            <img
              src="/minimal-scandinavian-workspace-with-natural-light-.jpg"
              alt="Спокойное рабочее пространство"
              className="w-full h-full object-cover"
            />
            {/* Decorative accent */}
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-background/90 backdrop-blur-sm rounded-lg">
              <p className="text-sm text-muted-foreground italic">
                «Когда жизнь и работа движутся в гармонии, лучшие идеи не просто появляются — они текут сами собой.»
              </p>
            </div>
          </div>

          {/* Right: Text content */}
          <div className="flex flex-col gap-8">
            <span className="text-sm uppercase tracking-widest text-sage">Наша философия</span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground leading-tight text-balance">
              Осознанная работа и тихий фокус
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Hvile родился из простого наблюдения: самая значимая работа редко происходит среди постоянных
                уведомлений и бесконечных списков задач. Она рождается в моменты тишины.
              </p>
              <p>
                Мы создали инструмент, который уважает ритм глубокой работы — создаёт пространство для концентрации,
                рефлексии и того сосредоточенного внимания, которое превращает обычные задачи в мастерство.
              </p>
            </div>
            <div className="pt-4">
              <a href="#features" className="inline-flex items-center gap-2 text-foreground group">
                <span className="border-b border-foreground pb-0.5">Наш подход</span>
                <span className="text-terracotta group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
