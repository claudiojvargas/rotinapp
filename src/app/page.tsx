import { CalendarCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-12">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
          <CalendarCheck aria-hidden="true" className="size-6" />
        </span>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">Rotinapp</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          A base da aplicação está pronta.
        </p>
      </section>
    </main>
  );
}
