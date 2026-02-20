"use client";

import { useState, useMemo } from "react";
import programs from "../../../data/programs.json";
import partners from "../../../data/partners.json";
import bonuses from "../../../data/bonuses.json";

const programMap = programs.reduce((acc, p) => ({ ...acc, [p.id]: p }), {} as Record<string, typeof programs[0]>);
const partnerMap = partners.reduce((acc, p) => ({ ...acc, [p.id]: p }), {} as Record<string, typeof partners[0]>);

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedPartner, setSelectedPartner] = useState("all");
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'start_date', direction: 'desc' });

  const filteredBonuses = useMemo(() => {
    let sorted = [...bonuses].filter((bonus) => {
      const matchesSearch = 
        searchQuery === "" ||
        bonus.program_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bonus.partner_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        programMap[bonus.program_id]?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partnerMap[bonus.partner_id]?.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProgram = selectedProgram === "all" || bonus.program_id === selectedProgram;
      const matchesPartner = selectedPartner === "all" || bonus.partner_id === selectedPartner;

      return matchesSearch && matchesProgram && matchesPartner;
    });

    sorted.sort((a, b) => {
      if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [searchQuery, selectedProgram, selectedPartner, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: string) => {
      if (sortConfig.key !== key) return null;
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="sticky top-0 z-20 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
         <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-xl font-semibold tracking-tight text-[#1D4ED8]">TransferPoints</div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#475569] md:flex">
            <a href="/" className="hover:text-[#2563EB]">Home</a>
            <a href="/bonuses" className="hover:text-[#2563EB]">Live Bonuses</a>
            <a href="/history" className="text-[#2563EB]">History</a>
             <a href="/programs" className="hover:text-[#2563EB]">Programs</a>
            <a href="/partners" className="hover:text-[#2563EB]">Airlines & Hotels</a>
             <a href="/matrix" className="hover:text-[#2563EB]">Matrix</a>
          </nav>
           <div className="flex items-center gap-3">
            <button className="rounded-full bg-[#2563EB] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]">
              Set Alerts
            </button>
          </div>
        </div>
      </header>
      
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-end justify-between">
            <div>
                <h1 className="text-3xl font-bold text-[#0F172A]">Bonus History Archive</h1>
                <p className="mt-2 text-[#64748B]">Searchable database of all past transfer bonuses.</p>
            </div>
            <button className="text-sm font-medium text-[#2563EB] hover:underline">Download CSV</button>
        </div>

        <div className="mb-8 space-y-4 rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
             <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-semibold uppercase text-[#64748B]">Search</label>
                  <input 
                    type="text" 
                    placeholder="Search history..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                  />
                </div>
                <div>
                   <label className="mb-1 block text-xs font-semibold uppercase text-[#64748B]">Program</label>
                   <select 
                      value={selectedProgram}
                      onChange={(e) => setSelectedProgram(e.target.value)}
                      className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                   >
                      <option value="all">All Programs</option>
                      {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                   </select>
                </div>
                <div>
                   <label className="mb-1 block text-xs font-semibold uppercase text-[#64748B]">Partner</label>
                   <select 
                      value={selectedPartner}
                      onChange={(e) => setSelectedPartner(e.target.value)}
                      className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                   >
                      <option value="all">All Partners</option>
                       {partners.sort((a,b) => a.name.localeCompare(b.name)).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                   </select>
                </div>
             </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
            <table className="min-w-full divide-y divide-[#E2E8F0]">
                <thead className="bg-[#F8FAFC]">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#64748B] cursor-pointer hover:bg-slate-100" onClick={() => requestSort('program_id')}>
                            Program {getSortIndicator('program_id')}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#64748B] cursor-pointer hover:bg-slate-100" onClick={() => requestSort('partner_id')}>
                            Partner {getSortIndicator('partner_id')}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#64748B] cursor-pointer hover:bg-slate-100" onClick={() => requestSort('bonus_pct')}>
                            Bonus {getSortIndicator('bonus_pct')}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#64748B] cursor-pointer hover:bg-slate-100" onClick={() => requestSort('start_date')}>
                            Dates {getSortIndicator('start_date')}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#64748B] cursor-pointer hover:bg-slate-100" onClick={() => requestSort('status')}>
                            Status {getSortIndicator('status')}
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] bg-white">
                    {filteredBonuses.map((bonus) => (
                        <tr key={bonus.id} className="hover:bg-[#F8FAFC]">
                            <td className="whitespace-nowrap px-6 py-4">
                                <div className="flex items-center gap-3">
                                    {programMap[bonus.program_id] && (
                                        <img src={programMap[bonus.program_id].logo_url} alt="" className="h-6 w-6 rounded-full object-contain" />
                                    )}
                                    <span className="text-sm font-medium text-[#0F172A]">{programMap[bonus.program_id]?.name || bonus.program_id}</span>
                                </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <div className="flex items-center gap-3">
                                    {partnerMap[bonus.partner_id] && (
                                        <img src={partnerMap[bonus.partner_id].logo_url} alt="" className="h-6 w-6 rounded-full object-contain" />
                                    )}
                                    <span className="text-sm text-[#0F172A]">{partnerMap[bonus.partner_id]?.name || bonus.partner_id}</span>
                                </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <span className="inline-flex rounded-full bg-[#FFFBEB] px-2.5 py-0.5 text-xs font-bold text-[#D97706]">
                                    +{bonus.bonus_pct}%
                                </span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-[#64748B]">
                                {new Date(bonus.start_date).toLocaleDateString()} – {bonus.end_date ? new Date(bonus.end_date).toLocaleDateString() : "TBD"}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    bonus.status === 'live' ? 'bg-[#ECFDF5] text-[#065F46]' :
                                    bonus.status === 'expired' ? 'bg-[#FEF2F2] text-[#991B1B]' :
                                    'bg-[#EFF6FF] text-[#1E40AF]'
                                }`}>
                                    {bonus.status.charAt(0).toUpperCase() + bonus.status.slice(1)}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredBonuses.length === 0 && (
                <div className="p-8 text-center text-sm text-[#64748B]">
                    No history found matching your filters.
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
