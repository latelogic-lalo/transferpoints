import programs from "../../data/programs.json";
import bonuses from "../../data/bonuses.json";

export default function ProgramsIndex() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-20 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
         <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-xl font-semibold tracking-tight text-[#1D4ED8]">TransferPoints</div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#475569] md:flex">
            <a href="/" className="hover:text-[#2563EB]">Home</a>
            <a href="/bonuses" className="hover:text-[#2563EB]">Live Bonuses</a>
            <a href="/history" className="hover:text-[#2563EB]">History</a>
             <a href="/programs" className="text-[#2563EB]">Programs</a>
            <a href="/partners" className="hover:text-[#2563EB]">Airlines & Hotels</a>
             <a href="/matrix" className="hover:text-[#2563EB]">Matrix</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-8">Transfer Programs</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map(program => (
                <a key={program.id} href={`/programs/${program.id}`} className="block rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm hover:border-[#2563EB] transition">
                    <div className="flex items-center gap-4 mb-4">
                        <img src={program.logo_url} alt={program.name} className="h-12 w-12 rounded-full object-contain bg-white border border-[#E2E8F0]" />
                        <div>
                            <h2 className="font-bold text-[#0F172A]">{program.name}</h2>
                            <p className="text-sm text-[#64748B]">{program.bank}</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#64748B] mb-4 line-clamp-2">{program.description}</p>
                    <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-[#1D4ED8] bg-[#EFF6FF] px-2 py-1 rounded">{program.valuation_cpp}¢ value</span>
                        {bonuses.filter(b => b.program_id === program.id && b.status === "live").length > 0 && (
                            <span className="text-[#065F46] bg-[#ECFDF5] px-2 py-1 rounded">
                                {bonuses.filter(b => b.program_id === program.id && b.status === "live").length} Live Bonuses
                            </span>
                        )}
                    </div>
                </a>
            ))}
        </div>
      </main>
    </div>
  );
}
