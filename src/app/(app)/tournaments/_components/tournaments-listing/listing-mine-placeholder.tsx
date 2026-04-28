import { EmptyState } from "@/app/(app)/_components";

export function ListingMinePlaceholder() {
  return (
    <EmptyState
      title="Faça login para ver seus campeonatos"
      hint="Acompanhe aqui os torneios em que você está inscrito, partidas agendadas e resultados ao vivo."
      size="lg"
      action={
        <button
          type="button"
          disabled
          className="inline-flex cursor-not-allowed items-center justify-center rounded-md bg-primary/50 px-5 py-2 text-sm font-semibold text-primary-foreground"
          title="Em breve"
        >
          Entrar · em breve
        </button>
      }
    />
  );
}
