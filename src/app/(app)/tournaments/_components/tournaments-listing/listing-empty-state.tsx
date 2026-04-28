import { EmptyState } from "@/app/(app)/_components";

export function ListingEmptyState() {
  return (
    <EmptyState
      title="Nenhum torneio encontrado"
      hint="Tente limpar os filtros de modalidade ou buscar por outro nome."
      size="lg"
    />
  );
}
