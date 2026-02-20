"use client";

import { useState } from "react";
import programs from "../../data/programs.json";
import partners from "../../data/partners.json";

export default function AlertsPage() {
  const [email, setEmail] = useState("");
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [minBonus, setMinBonus] = useState(20);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Alerts set for ${email}! (Demo mode)`);
  };

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
            <a href="/partners" className="hover:text-[#2563EB]">Airlines & Hotels</a>
             <a href="/matrix" className="hover:text-[#2563EB]">Matrix</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-12">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-[#0F172A]">Get Bonus Alerts</h1>
            <p className="mt-2 text-[#64748B]">Never miss a transfer bonus. We'll email you when new offers go live.</p>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-[#0F172A]">Email Address</label>
                    <input 
                        type="email" 
                        required 
                        className="mt-2 w-full rounded-lg border border-[#E2E8F0] p-3 text-sm focus:border-[#2563EB] focus:outline-none"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-[#0F172A]">Minimum Bonus %</label>
                    <div className="mt-2 flex items-center gap-4">
                        <input 
                            type="range" 
                            min="10" 
                            max="50" 
                            step="5" 
                            className="w-full accent-[#2563EB]"
                            value={minBonus}
                            onChange={e => setMinBonus(parseInt(e.target.value))}
                        />
                        <span className="font-mono font-bold text-[#2563EB]">{minBonus}%</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-[#0F172A] mb-3">Programs to Monitor</label>
                    <div className="grid grid-cols-2 gap-3">
                        {programs.map(p => (
                            <label key={p.id} className="flex items-center gap-2 text-sm text-[#64748B]">
                                <input type="checkbox" className="rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]" />
                                {p.name}
                            </label>
                        ))}
                    </div>
                </div>

                <button type="submit" className="w-full rounded-xl bg-[#2563EB] py-3 font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-[#1D4ED8] transition">
                    Create Alert
                </button>
            </form>
        </div>
      </main>
    </div>
  );
}
