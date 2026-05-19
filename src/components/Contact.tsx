import { useState, FormEvent } from "react";

export function Contact() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-card">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-sm uppercase tracking-widest text-muted-foreground mb-4 block">Начните</span>
        <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground mb-6 text-balance">
          Готовы обрести покой?
        </h2>
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          Присоединяйтесь к тысячам людей, открывших спокойный подход к работе. Оставьте email — мы поможем начать.
        </p>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-sage/10 border border-sage/20">
            <p className="text-foreground font-serif text-2xl mb-2">Добро пожаловать в Hvile</p>
            <p className="text-muted-foreground">Проверьте почту — мы отправили следующие шаги.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="ваш@email.ru"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sage/30 transition-all duration-300"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity duration-300 whitespace-nowrap"
            >
              Начать путь
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
