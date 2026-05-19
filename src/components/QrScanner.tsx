import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Icon from "@/components/ui/icon";

type Step = "scan" | "category" | "success";

const CATEGORIES = [
  { id: "paper", label: "Бумага", emoji: "📄", color: "bg-blue-50 border-blue-200 hover:bg-blue-100", icon: "FileText" },
  { id: "glass", label: "Стекло", emoji: "🍶", color: "bg-green-50 border-green-200 hover:bg-green-100", icon: "GlassWater" },
  { id: "plastic", label: "Пластик", emoji: "♻️", color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100", icon: "Package" },
  { id: "food", label: "Пищевые", emoji: "🥬", color: "bg-orange-50 border-orange-200 hover:bg-orange-100", icon: "Leaf" },
];

export function QrScanner() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("scan");
  const [qrResult, setQrResult] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [opening, setOpening] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scanning = useRef(false);

  const startScanner = () => {
    setStep("scan");
    setQrResult(null);
    setSelectedCategory(null);
    setError(null);
    setOpening(false);
    setOpen(true);
  };

  useEffect(() => {
    if (!open || step !== "scan" || scanning.current) return;

    const qr = new Html5Qrcode("qr-reader");
    scannerRef.current = qr;
    scanning.current = true;

    qr.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 230, height: 230 } },
      (text) => {
        setQrResult(text);
        qr.stop().then(() => {
          scanning.current = false;
          setStep("category");
        });
      },
      () => {}
    ).catch(() => {
      setError("Не удалось получить доступ к камере. Разрешите доступ в настройках браузера.");
      scanning.current = false;
    });

    return () => {
      if (scanning.current) {
        qr.stop().catch(() => {}).finally(() => { scanning.current = false; });
      }
    };
  }, [open, step]);

  const handleClose = () => {
    if (scannerRef.current && scanning.current) {
      scannerRef.current.stop().catch(() => {}).finally(() => { scanning.current = false; });
    }
    setOpen(false);
  };

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    setOpening(true);
    setTimeout(() => setStep("success"), 1200);
  };

  return (
    <>
      <button
        onClick={startScanner}
        className="group inline-flex items-center gap-3 px-8 py-4 border border-border bg-card text-foreground rounded-full text-base hover:border-sage/50 hover:bg-sage/5 transition-all duration-300"
      >
        <Icon name="QrCode" size={20} className="text-sage" />
        Сканировать QR-код
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-background rounded-2xl p-8 w-full max-w-sm relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            {/* ШАГ 1: Сканирование */}
            {step === "scan" && (
              <>
                <h3 className="font-serif text-2xl text-foreground mb-1 text-center">Сканируйте QR-код</h3>
                <p className="text-sm text-muted-foreground text-center mb-6">Наведите камеру на QR-код на мусорке</p>

                {!error && (
                  <div id="qr-reader" className="rounded-xl overflow-hidden" style={{ width: "100%" }} />
                )}

                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-center">
                    <Icon name="CameraOff" size={32} className="text-red-400 mx-auto mb-2" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </>
            )}

            {/* ШАГ 2: Выбор категории */}
            {step === "category" && (
              <>
                <div className="flex items-center justify-center mb-2">
                  <Icon name="CheckCircle" size={28} className="text-sage mr-2" />
                  <h3 className="font-serif text-2xl text-foreground">Урна найдена!</h3>
                </div>
                <p className="text-sm text-muted-foreground text-center mb-6">Выберите категорию отходов</p>

                <div className="grid grid-cols-2 gap-3">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      disabled={opening}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${cat.color} ${opening && selectedCategory === cat.id ? "scale-95 opacity-70" : ""}`}
                    >
                      <span className="text-3xl">{cat.emoji}</span>
                      <span className="text-sm font-medium text-foreground">{cat.label}</span>
                    </button>
                  ))}
                </div>

                {opening && (
                  <div className="mt-5 text-center">
                    <div className="inline-flex items-center gap-2 text-sage text-sm animate-pulse">
                      <Icon name="Unlock" size={16} />
                      Открываем урну…
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ШАГ 3: Успех */}
            {step === "success" && (
              <div className="text-center py-4">
                <div className="text-6xl mb-4 animate-bounce">🗑️</div>
                <h3 className="font-serif text-2xl text-foreground mb-2">Урна открыта!</h3>
                <p className="text-muted-foreground text-sm mb-1">
                  Категория: <span className="font-medium text-foreground">
                    {CATEGORIES.find(c => c.id === selectedCategory)?.label}
                  </span>
                </p>
                <p className="text-sage font-medium mt-3 mb-6">+10 баллов начислено 🎉</p>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-full text-sm hover:opacity-90 transition-opacity"
                >
                  Отлично!
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
