"use client";

export default function Footer() {
  const now = new Date();

  return (
    <footer className="relative overflow-hidden bg-forest/95 border-t-2 border-faded-brown/30">
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 py-14 px-4 max-w-4xl mx-auto">
        {/* Top section — ornamental border */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-parchment/20" />
          <svg className="w-10 h-10 text-parchment/30" viewBox="0 0 40 40">
            <path d="M20,5 C10,12 5,20 10,30 C15,25 18,18 20,12 C22,18 25,25 30,30 C35,20 30,12 20,5"
              fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="20" cy="18" r="2" fill="currentColor" opacity="0.5" />
          </svg>
          <div className="h-px flex-1 bg-parchment/20" />
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Column 1 — About */}
          <div>
            <h3 className="font-heading text-parchment text-lg mb-3">The Gnome Studies Society</h3>
            <p className="font-body text-parchment/60 text-sm leading-relaxed">
              Dedicated to the careful observation and documentation of gnome populations across the European countryside since 1889.
            </p>
            <div className="mt-4 wax-seal" style={{ transform: "rotate(-5deg)" }}>
              G.S.S.
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h3 className="font-heading text-parchment text-lg mb-3">Contents</h3>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Title Page", href: "#hero" },
                { label: "Field Observations", href: "#observations" },
                { label: "Anatomical Study", href: "#anatomy" },
                { label: "Human Encounters", href: "#encounters" },
                { label: "Latest Sightings", href: "#sightings" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-parchment/50 text-sm hover:text-parchment transition-colors no-underline flex items-center gap-2"
                >
                  <span className="text-rust/60">&mdash;</span>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3 — Correspondence */}
          <div>
            <h3 className="font-heading text-parchment text-lg mb-3">Correspondence</h3>
            <p className="font-body text-parchment/60 text-sm mb-4">
              Reports of new sightings may be submitted through the following channels.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://x.com/GnomesStudies"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm text-parchment/60 hover:text-parchment transition-colors no-underline"
              >
                <svg className="w-4 h-4 fill-parchment/50" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @GnomesStudies
              </a>
            </div>
          </div>
        </div>

        {/* Bottom — decorative small sketches */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-parchment/15" />
          {/* Small mushroom */}
          <svg className="w-5 h-6 text-parchment/20" viewBox="0 0 20 24">
            <ellipse cx="10" cy="8" rx="8" ry="6" fill="none" stroke="currentColor" strokeWidth="1" />
            <line x1="10" y1="14" x2="10" y2="22" stroke="currentColor" strokeWidth="1" />
          </svg>
          {/* Small leaf */}
          <svg className="w-5 h-5 text-parchment/20" viewBox="0 0 20 20">
            <path d="M10,2 C4,6 2,12 6,16 C8,13 9,9 10,5 C11,9 12,13 14,16 C18,12 16,6 10,2" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          {/* Small flower */}
          <svg className="w-5 h-5 text-parchment/20" viewBox="0 0 20 20">
            <circle cx="10" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="7" cy="5" r="3" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="13" cy="5" r="3" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <line x1="10" y1="11" x2="10" y2="18" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          <div className="h-px flex-1 bg-parchment/15" />
        </div>

        {/* Fine print */}
        <div className="text-center space-y-2">
          <p className="font-body text-parchment/40 text-xs">
            &copy; {now.getFullYear()} The Gnome Studies Society &mdash; All observations documented in good faith
          </p>
          <p className="font-handwritten text-parchment/30 text-sm">
            &ldquo;Look closely, for they are always nearer than you think.&rdquo;
          </p>
          <p className="font-body text-parchment/25 text-[10px] mt-4">
            $GNOMES is a community folklore project. This is not financial advice. We are merely documenting the evidence.
          </p>
        </div>
      </div>
    </footer>
  );
}
