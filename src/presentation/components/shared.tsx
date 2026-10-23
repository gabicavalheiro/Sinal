import { AudioLines, CircleCheck, Pause } from "lucide-react";
import { type ReactNode } from "react";
export function PageHeading({
  eyebrow,
  title,
  emphasis,
  description,
}: {
  eyebrow: string;
  title: string;
  emphasis: string;
  description: string;
}) {
  return (
    <section className="page-heading page-heading--inner">
      <div>
        <div className="eyebrow">
          <span />
          {eyebrow}
        </div>
        <h1>
          {title}
          <br />
          <em>{emphasis}</em>
        </h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
export function Stat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <section className="stat-card">
      <span className="stat-icon">{icon}</span>
      <strong>{value}</strong>
      <span>{label}</span>
    </section>
  );
}
export function PipelineStep({
  number,
  title,
  text,
  pending = false,
}: {
  number: string;
  title: string;
  text: string;
  pending?: boolean;
}) {
  return (
    <div className={"pipeline-step " + (pending ? "pipeline-step--pending" : "")}>
      <span>{number}</span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      {pending ? <Pause size={17} /> : <CircleCheck size={17} />}
    </div>
  );
}
export function StackCard({
  icon,
  title,
  category,
  text,
  status,
}: {
  icon: ReactNode;
  title: string;
  category: string;
  text: string;
  status: string;
}) {
  return (
    <section className="stack-card">
      <div className="stack-icon">{icon}</div>
      <span className="micro-label">{category}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="stack-status">
        <span />
        {status}
      </span>
    </section>
  );
}
export function InfoBanner() {
  return (
    <aside className="info-banner">
      <AudioLines size={26} strokeWidth={1.4} />
      <div>
        <strong>Uma língua vai muito além do alfabeto.</strong>
        <p>
          Libras tem gramática, cultura e uma comunidade própria. Aprenda também com
          pessoas surdas e professores de Libras.
        </p>
      </div>
    </aside>
  );
}
