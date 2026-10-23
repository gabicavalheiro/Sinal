import { Lightbulb } from "lucide-react";

export function QuickGuide() {
  return (
    <section className="quick-guide">
      <div className="guide-intro">
        <div className="guide-icon">
          <Lightbulb size={20} strokeWidth={1.5} />
        </div>
        <div>
          <h2>Um bom gesto começa assim.</h2>
          <p>Pequenos cuidados fazem a diferença.</p>
        </div>
      </div>
      <div className="guide-step">
        <span>01</span>
        <div>
          <h3>Encontre a luz</h3>
          <p>Prefira um lugar bem iluminado.</p>
        </div>
      </div>
      <div className="guide-step">
        <span>02</span>
        <div>
          <h3>Dê espaço à mão</h3>
          <p>Deixe a mão inteira na câmera.</p>
        </div>
      </div>
      <div className="guide-step">
        <span>03</span>
        <div>
          <h3>Vá no seu ritmo</h3>
          <p>Mantenha o gesto por um instante.</p>
        </div>
      </div>
    </section>
  );
}
