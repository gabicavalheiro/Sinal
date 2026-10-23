import { ArrowLeft, LockKeyhole, ShieldCheck, Video } from "lucide-react";
import { PageHeading } from "../components/shared";
import { Button, Toggle } from "../design-system";
import type { WorkspaceModel } from "../useWorkspace";
type Props = Pick<
  WorkspaceModel,
  "navigate" | "preferences" | "setPreferences" | "setToast"
>;

export function SettingsPage({ navigate, preferences, setPreferences, setToast }: Props) {
  return (
    <>
      <PageHeading
        eyebrow="DO SEU JEITO"
        title="Seu espaço,"
        emphasis="seu ritmo."
        description="Ajustes simples para deixar a experiência confortável para você."
      />
      <section className="content-card settings-card">
        <div className="section-title">
          <h2>Câmera e visualização</h2>
          <Video size={19} />
        </div>
        <Toggle
          checked={preferences.points}
          onChange={(points) => setPreferences((p) => ({ ...p, points }))}
          label="Mostrar os pontos da mão"
          description="Exibe os 21 pontos identificados pelo detector sobre o vídeo."
        />
        <Toggle
          checked={preferences.mirror}
          onChange={(mirror) => setPreferences((p) => ({ ...p, mirror }))}
          label="Espelhar a câmera"
          description="O vídeo se comporta como um espelho. A normalização usa a imagem original."
        />
        <div className="settings-note">
          <ShieldCheck size={22} />
          <div>
            <strong>Privacidade desde o primeiro gesto.</strong>
            <p>
              Não solicitamos microfone. O vídeo não é gravado nem enviado. As
              preferências e as contagens ficam neste navegador. O detector baixa seus
              arquivos do MediaPipe no primeiro uso.
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            setPreferences({ points: true, mirror: true });
            setToast("Preferências restauradas.");
          }}
        >
          Restaurar preferências
        </Button>
      </section>
      <section className="content-card settings-card">
        <div className="section-title">
          <h2>Permissão da câmera</h2>
          <LockKeyhole size={18} />
        </div>
        <p className="settings-body">
          O navegador pede permissão somente quando você toca em “Ativar câmera”. Se o
          acesso foi bloqueado, abra as permissões deste site na barra de endereço e
          permita o uso da câmera.
        </p>
        <Button onClick={() => navigate("live")} icon={<ArrowLeft size={16} />}>
          Voltar à tradução
        </Button>
      </section>
    </>
  );
}
