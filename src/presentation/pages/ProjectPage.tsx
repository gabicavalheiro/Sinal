import {
  BookOpen,
  Braces,
  ChartNoAxesColumnIncreasing,
  ChevronDown,
  Database,
  FileText,
} from "lucide-react";
import { InfoBanner, PageHeading, PipelineStep, StackCard } from "../components/shared";
import { adrs, glossary } from "../content";
import { Tag } from "../design-system";

export function ProjectPage() {
  return (
    <>
      <PageHeading
        eyebrow="CONSTRUÍDO COM INTENÇÃO"
        title="Tecnologia que"
        emphasis="aproxima pessoas."
        description="Um laboratório para explorar a datilologia em Libras. Conheça as escolhas por trás de cada gesto."
      />
      <div className="project-intro">
        <div className="project-intro-copy">
          <Tag variant="green">Primeira etapa · em construção</Tag>
          <h2>
            Leve no navegador.
            <br />
            Cuidadoso por dentro.
          </h2>
          <p>
            A câmera identifica os pontos da mão e o modelo SpellNet sugere 21 letras
            estáticas no próprio navegador. A confirmação indica estabilidade da previsão;
            a qualidade ainda precisa de validação independente.
          </p>
          <p>
            Esta experiência explora o alfabeto manual. Não traduz frases ou a gramática
            de Libras.
          </p>
        </div>
        <div className="pipeline">
          <PipelineStep
            number="01"
            title="A mão vira pontos"
            text="MediaPipe · 21 pontos × 3 coordenadas"
          />
          <PipelineStep
            number="02"
            title="Os pontos ganham contexto"
            text="Punho como origem · escala normalizada"
          />
          <PipelineStep
            number="03"
            title="O modelo sugere uma letra"
            text="SpellNet · 21 letras estáticas · experimental"
          />
        </div>
      </div>
      <div className="section-title project-section-title">
        <div>
          <h2>Uma stack com propósito</h2>
          <p>Contratos definidos. Serviços preparados para evoluir.</p>
        </div>
        <Tag>Arquitetura limpa</Tag>
      </div>
      <div className="stack-grid">
        <StackCard
          icon={<Braces size={21} />}
          title="React + TypeScript"
          category="EXPERIÊNCIA"
          text="Vite, design system e casos de uso independentes da interface."
          status="Implementado"
        />
        <StackCard
          icon={<Database size={21} />}
          title="MySQL"
          category="SERVIÇO DE PRÁTICA"
          text="Catálogo e sessões, com esquema SQL e API própria."
          status="Base de desenvolvimento"
        />
        <StackCard
          icon={<Database size={21} />}
          title="SQL Server"
          category="SERVIÇO DE TREINAMENTO"
          text="Versões de datasets e registro dos experimentos."
          status="Base de desenvolvimento"
        />
        <StackCard
          icon={<ChartNoAxesColumnIncreasing size={21} />}
          title="Pandas + NumPy"
          category="DADOS E MODELO"
          text="Validação tabular, normalização vetorial e baseline exportável."
          status="Pipeline inicial"
        />
      </div>
      <div className="project-documentation">
        <section className="content-card">
          <div className="section-title">
            <h2>Decisões de arquitetura</h2>
            <FileText size={18} />
          </div>
          {adrs.map((adr) => (
            <details className="adr" key={adr.id}>
              <summary>
                <span className="adr-number">ADR {adr.id}</span>
                <strong>{adr.title}</strong>
                <ChevronDown size={16} />
              </summary>
              <p>{adr.body}</p>
            </details>
          ))}
        </section>
        <section className="content-card glossary">
          <div className="section-title">
            <h2>Um pequeno glossário</h2>
            <BookOpen size={18} />
          </div>
          <dl>
            {glossary.map(([term, definition]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
      <InfoBanner />
    </>
  );
}
