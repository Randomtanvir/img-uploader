import React from "react";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="text-2xl font-bold tracking-tight">
            Nova<span className="text-indigo-400">.</span>
          </a>

          <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
          </nav>

          <a
            href="#get-started"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -z-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-28 text-center md:pt-36">
          <div className="mx-auto mb-6 inline-flex rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-300">
            ✨ The smarter way to work
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Build faster.
            <br />
            <span className="text-indigo-400">Grow smarter.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400">
            Nova helps modern teams simplify their workflow, automate repetitive
            tasks, and focus on the work that actually matters.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#get-started"
              className="rounded-full bg-indigo-500 px-7 py-3.5 font-semibold transition hover:bg-indigo-400"
            >
              Start for free →
            </a>

            <a
              href="#features"
              className="rounded-full border border-white/15 px-7 py-3.5 font-semibold text-slate-200 transition hover:bg-white/5"
            >
              Explore features
            </a>
          </div>

          {/* Dashboard Preview */}
          <div className="mx-auto mt-20 max-w-5xl">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-indigo-950/40">
              <div className="rounded-xl border border-white/10 bg-slate-900 p-5">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl bg-white/[0.04] p-5 text-left">
                    <p className="text-sm text-slate-400">Projects</p>
                    <p className="mt-2 text-3xl font-bold">24</p>
                    <p className="mt-2 text-sm text-green-400">↑ 18.2%</p>
                  </div>

                  <div className="rounded-xl bg-white/[0.04] p-5 text-left">
                    <p className="text-sm text-slate-400">Completed</p>
                    <p className="mt-2 text-3xl font-bold">186</p>
                    <p className="mt-2 text-sm text-green-400">↑ 24.5%</p>
                  </div>

                  <div className="rounded-xl bg-white/[0.04] p-5 text-left">
                    <p className="text-sm text-slate-400">Productivity</p>
                    <p className="mt-2 text-3xl font-bold">94%</p>
                    <p className="mt-2 text-sm text-indigo-400">Excellent</p>
                  </div>
                </div>

                <div className="mt-4 h-48 rounded-xl bg-gradient-to-t from-indigo-500/10 to-transparent p-5">
                  <div className="flex h-full items-end gap-3">
                    {[35, 50, 42, 65, 55, 75, 68, 88, 78, 96].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-md bg-indigo-500/70"
                          style={{ height: `${height}%` }}
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="border-y border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-14 gap-y-6 px-6 py-10 text-xl font-semibold text-slate-600">
          <span>Acme</span>
          <span>Vertex</span>
          <span>Orbit</span>
          <span>Layer</span>
          <span>Vertex</span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-28">
        <div className="max-w-2xl">
          <p className="font-semibold text-indigo-400">FEATURES</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need to move faster.
          </h2>
          <p className="mt-5 text-lg text-slate-400">
            Powerful tools designed to make your team&apos;s everyday work
            simpler and more productive.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: "⚡",
              title: "Automate everything",
              description:
                "Remove repetitive work with powerful automations that run in the background.",
            },
            {
              icon: "📊",
              title: "Understand your data",
              description:
                "Get clear insights and analytics so you can make better decisions.",
            },
            {
              icon: "🔒",
              title: "Stay secure",
              description:
                "Enterprise-grade security keeps your team's data protected at every step.",
            },
            {
              icon: "🤝",
              title: "Work together",
              description:
                "Bring your team together with real-time collaboration and shared workflows.",
            },
            {
              icon: "🚀",
              title: "Scale effortlessly",
              description:
                "Nova grows with your business without adding unnecessary complexity.",
            },
            {
              icon: "✨",
              title: "Beautiful by default",
              description:
                "A simple, thoughtful interface that your whole team will enjoy using.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:bg-white/[0.05]"
            >
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="get-started" className="px-6 pb-28">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-indigo-400/20 bg-indigo-500/10 px-6 py-20 text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Ready to build something great?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
            Join thousands of teams already using Nova to simplify their work
            and move faster.
          </p>

          <a
            href="#"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Get started for free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Nova. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
