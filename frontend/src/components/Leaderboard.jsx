import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [view, setView] = useState("leaderboard"); // "leaderboard" | "personal"
  const [user, setUser] = useState(null);

  const [leaderboard, setLeaderboard] = useState([]);
  const [myStats, setMyStats] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load logged-in user
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Fetch overall leaderboard
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://127.0.0.1:8000/leaderboard");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || "Failed to load leaderboard");
        }
        setLeaderboard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Fetch personal stats
  useEffect(() => {
    if (view !== "personal") return;
    if (!user) return;

    const fetchMyStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/my-stats/${user.user_id}`
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || "Failed to load personal stats");
        }
        setMyStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyStats();
  }, [view, user]);

  const activeData = view === "leaderboard" ? leaderboard : myStats;

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString();
    } catch {
      return iso;
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center items-start pt-16">
      <div className="w-full max-w-4xl px-4">
        <h1 className="text-3xl font-[Quantico] text-[#fffffffb] mb-6 text-center">
          {view === "leaderboard" ? "Current Standings" : "Your Stats"}
        </h1>

        <div className="flex justify-center mb-4 gap-3 font-[Quantico]">
          <button
            onClick={() => setView("leaderboard")}
            className={`px-4 py-2 rounded-md border text-sm
              ${
                view === "leaderboard"
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white/40 hover:bg-white/10"
              }
            `}
          >
            Overall Leaderboard
          </button>
          <button
            onClick={() => setView("personal")}
            className={`px-4 py-2 rounded-md border text-sm
              ${
                view === "personal"
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white/40 hover:bg-white/10"
              }
            `}
          >
            My Stats
          </button>
        </div>

        {view === "personal" && !user && (
          <p className="text-center text-[#ffffffbb] mb-4 font-[Quantico]">
            Log in to see your personal stats.
          </p>
        )}

        {error && (
          <p className="text-center text-red-400 mb-4 font-[Quantico]">
            {error}
          </p>
        )}

        {loading && (
          <p className="text-center text-[#ffffffbb] mb-4 font-[Quantico]">
            Loading...
          </p>
        )}

        <div className="overflow-hidden rounded-xl bg-[#0b2038] shadow-lg border border-white/10 font-[Quantico]">
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
              {activeData.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`
                    hover:bg-white/5 transition
                    ${view === "leaderboard" && idx === 0 ? "bg-yellow-500/10" : ""}
                  `}
                >
                  <td className="px-4 py-3 font-semibold text-[#ffffffaa]">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3">{row.username}</td>
                  <td className="px-4 py-3 text-right font-mono">
                    {row.wpm.toFixed ? row.wpm.toFixed(1) : row.wpm}
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    {row.accuracy.toFixed ? row.accuracy.toFixed(1) : row.accuracy}%
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-[#ffffff88]">
                    {formatDate(row.created_at)}
                  </td>
                </tr>
              ))}

              {activeData.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-4 text-center text-[#ffffff99] text-sm"
                  >
                    {view === "leaderboard"
                      ? "No leaderboard data yet."
                      : user
                      ? "No personal stats to display yet."
                      : "Log in to see your stats."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
