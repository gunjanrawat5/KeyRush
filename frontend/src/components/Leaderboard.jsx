import React from 'react'

const Leaderboard = () => {
  const data = [
  { id: 1, name: "Gunjan", wpm: 92, accuracy: "98%", date: "2025-02-20" },
  { id: 2, name: "Natalie", wpm: 85, accuracy: "96%", date: "2025-02-18" },
  { id: 3, name: "Sam", wpm: 80, accuracy: "94%", date: "2025-02-17" },
  { id: 4, name: "Jordan", wpm: 75, accuracy: "92%", date: "2025-02-15" },
];
   return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center items-start pt-16">
      <div className="w-full max-w-4xl px-4">
        <h1 className="text-3xl font-[Quantico] text-[#fffffffb] mb-6 text-center">
          Current Standings
        </h1>

        <div className="overflow-hidden rounded-xl bg-[#0b2038] shadow-lg border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr className="text-left text-sm font-semibold text-[#ffffffcc]">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3 text-right">WPM</th>
                <th className="px-4 py-3 text-right">Accuracy</th>
                <th className="px-4 py-3 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm text-[#ffffffdd]">
              {data.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`
                    hover:bg-white/5 transition
                    ${idx === 0 ? "bg-yellow-500/10" : ""}
                  `}
                >
                  <td className="px-4 py-3 font-semibold text-[#ffffffaa]">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3 text-right font-mono">{row.wpm}</td>
                  <td className="px-4 py-3 text-right font-mono">
                    {row.accuracy}
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-[#ffffff88]">
                    {row.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Leaderboard