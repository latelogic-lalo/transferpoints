import programs from "../../../data/programs.json";
import bonuses from "../../../data/bonuses.json";
import partners from "../../../data/partners.json";

export async function generateStaticParams() {
  return partners.map((partner) => ({
    slug: partner.id,
  }));
}

export default function PartnerPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const partner = partners.find((p) => p.id === slug);
  const partnerBonuses = bonuses.filter(b => b.partner_id === slug && b.status === "live");
  const pastBonuses = bonuses.filter(b => b.partner_id === slug && b.status !== "live");

  if (!partner) return <div>Partner not found</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-20 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
         <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-xl font-semibold tracking-tight text-[#1D4ED8]">TransferPoints</div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#475569] md:flex">
            <a href="/" className="hover:text-[#2563EB]">Home</a>
            <a href="/bonuses" className="hover:text-[#2563EB]">Live Bonuses</a>
            <a href="/history" className="hover:text-[#2563EB]">History</a>
             <a href="/programs" className="hover:text-[#2563EB]">Programs</a>
            <a href="/partners" className="text-[#2563EB]">Airlines & Hotels</a>
             <a href="/matrix" className="hover:text-[#2563EB]">Matrix</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-center gap-6">
            <img src={partner.logo_url} alt={partner.name} className="h-24 w-24 rounded-full bg-white border border-[#E2E8F0] p-2 object-contain shadow-sm" />
            <div>
                <h1 className="text-4xl font-bold text-[#0F172A]">{partner.name}</h1>
                <p className="mt-2 text-lg text-[#64748B]">{partner.description}</p>
                <div className="mt-4 flex gap-4">
                    <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-sm font-semibold text-[#1D4ED8]">{partner.alliance}</span>
                    <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-sm font-semibold text-[#475569]">{partnerBonuses.length} Active Bonuses</span>
                </div>
            </div>
        </div>

        <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Active Incoming Bonuses</h2>
            {partnerBonuses.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {partnerBonuses.map(bonus => (
                        <div key={bonus.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <span className="rounded-full bg-[#ECFDF5] px-2 py-0.5 text-xs font-bold text-[#065F46]">LIVE</span>
                                <span className="text-2xl font-black text-[#F59E0B]">+{bonus.bonus_pct}%</span>
                            </div>
                            <div className="text-sm font-medium text-[#64748B]">Transfer from</div>
                            <div className="text-lg font-bold text-[#0F172A]">{programs.find(p => p.id === bonus.program_id)?.name}</div>
                            <div className="mt-4 text-xs text-[#94A3B8]">Ends {new Date(bonus.end_date).toLocaleDateString()}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-[#64748B]">No active incoming bonuses right now.</p>
            )}
        </section>

        <section>
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Past Incoming Bonuses</h2>
            <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
                <table className="min-w-full divide-y divide-[#E2E8F0]">
                    <thead className="bg-[#F8FAFC]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#64748B]">Program</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#64748B]">Bonus</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#64748B]">Dates</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] bg-white">
                        {pastBonuses.map(bonus => (
                            <tr key={bonus.id} className="hover:bg-[#F8FAFC]">
                                <td className="px-6 py-4 text-sm font-medium text-[#0F172A]">{programs.find(p => p.id === bonus.program_id)?.name}</td>
                                <td className="px-6 py-4 text-sm font-bold text-[#D97706]">+{bonus.bonus_pct}%</td>
                                <td className="px-6 py-4 text-sm text-[#64748B]">{new Date(bonus.start_date).toLocaleDateString()} - {new Date(bonus.end_date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
      </main>
    </div>
  );
}
