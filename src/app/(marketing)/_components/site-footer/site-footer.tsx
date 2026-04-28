import Link from "next/link";
import { Logo } from "@/components/shared/header/logo";
import {
  COMPANY_INFO,
  KEYWORDS,
  LEGAL_LINKS,
  NAV_COMPANY,
  NAV_CONTACT,
  NAV_PRODUCT,
  NAV_SERVICES,
} from "./constants";

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <section
        aria-label="Áreas de atuação"
        className="border-t border-foreground/10"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-3">
            <p className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-8 bg-brand-red" aria-hidden />
              Áreas de atuação
            </p>
            <h2 className="text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Tudo que a gente opera,{" "}
              <span className="text-muted-foreground">em um só lugar.</span>
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4">
            {KEYWORDS.map((group) => (
              <div key={group.title}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
                  {group.title}
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.items.map((k) => (
                    <li key={k.label}>
                      <Link
                        href={k.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground sm:text-[0.95rem]"
                      >
                        {k.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-foreground/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <div className="lg:col-span-4">
            <Logo className="h-10 w-auto" priority={false} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              Operação completa de esports — broadcast, liga, software e
              consultoria sob o mesmo teto. Um time, sem repasse.
            </p>
            <dl className="mt-8 space-y-3 text-sm text-muted-foreground">
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                  Razão social
                </dt>
                <dd className="text-foreground/85">
                  {COMPANY_INFO.razaoSocial}
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                  CNPJ
                </dt>
                <dd className="font-mono text-foreground/85">
                  {COMPANY_INFO.cnpj}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
              Produto
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV_PRODUCT.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
              Serviços
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV_SERVICES.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
              Empresa
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV_COMPANY.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
              Contato
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV_CONTACT.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} Arretados. Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
