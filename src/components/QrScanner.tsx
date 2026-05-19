import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Icon from "@/components/ui/icon";

export function QrScanner() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scanning = useRef(false);

  const startScanner = async () => {
    setResult(null);
    setError(null);
    setOpen(true);
  };

  useEffect(() => {
    if (!open || scanning.current) return;

    const qr = new Html5Qrcode("qr-reader");
    scannerRef.current = qr;
    scanning.current = true;

    qr.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (text) => {
        setResult(text);
        qr.stop().then(() => {
          scanning.current = false;
        });
      },
      () => {}
    ).catch(() => {
      setError("Не удалось получить доступ к камере. Разрешите доступ в настройках браузера.");
      scanning.current = false;
    });

    return () => {
      if (scanning.current) {
        qr.stop().catch(() => {}).finally(() => {
          scanning.current = false;
        });
      }
    };
  }, [open]);

  const handleClose = () => {
    if (scannerRef.current && scanning.current) {
      scannerRef.current.stop().catch(() => {}).finally(() => {
        scanning.current = false;
      });
    }
    setOpen(false);
    setResult(null);
    setError(null);
  };

  return (
    <>
      {/* Кнопка-триггер */}
      <button
        onClick={startScanner}
        className="group inline-flex items-center gap-3 px-8 py-4 border border-border bg-card text-foreground rounded-full text-base hover:border-sage/50 hover:bg-sage/5 transition-all duration-300"
      >
        <Icon name="QrCode" size={20} className="text-sage" />
        Сканировать QR-код
      </button>

      {/* Модальное окно сканера */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-background rounded-2xl p-8 w-full max-w-sm relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            <h3 className="font-serif text-2xl text-foreground mb-2 text-center">Сканируйте QR-код</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">Наведите камеру на QR-код на мусорке</p>

            {!result && !error && (
              <div
                id="qr-reader"
                className="rounded-xl overflow-hidden"
                style={{ width: "100%" }}
              />
            )}

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-center">
                <Icon name="CameraOff" size={32} className="text-red-400 mx-auto mb-2" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {result && (
              <div className="p-6 rounded-xl bg-sage/10 border border-sage/20 text-center">
                <Icon name="CheckCircle" size={40} className="text-sage mx-auto mb-3" />
                <p className="font-serif text-lg text-foreground mb-1">QR-код распознан!</p>
                <p className="text-sm text-muted-foreground break-all">{result}</p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm hover:opacity-90 transition-opacity"
                >
                  Готово
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
