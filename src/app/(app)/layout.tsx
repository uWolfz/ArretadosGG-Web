import { AppHeader, AppMobileTabBar } from "./_components";
import { ToastMockContainer } from "@/components/ui/toast-mock";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-black min-h-screen bg-background text-foreground flex flex-col">
      <AppHeader />
      <main className="flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
        {children}
      </main>
      <AppMobileTabBar />
      <ToastMockContainer />
    </div>
  );
}
