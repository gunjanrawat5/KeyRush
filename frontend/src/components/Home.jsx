import React, { useEffect, useState } from "react";
import Typing from "./Typing";
import { Link } from "react-router-dom";

const INITIAL_TIME = 15;

const Home = () => {
  const [seconds, setSeconds] = useState(INITIAL_TIME);
  const [hasStarted, setHasStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const { correct, total } = stats;

  const [user, setUser] = useState(null);
  const [hasSubmittedThisRound, setHasSubmittedThisRound] = useState(false);

  // Load logged in user from localStorage
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

  // Timer
  useEffect(() => {
    if (!hasStarted) return;
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [hasStarted, seconds]);

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleReset = () => {
    setSeconds(INITIAL_TIME);
    setHasStarted(false);
    setRound((prev) => prev + 1); // remount Typing
    setElapsed(0);
    setStats({ correct: 0, total: 0 });
    setHasSubmittedThisRound(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  const isActive = seconds > 0;
  const accuracy = total > 0 ? (correct / total) * 100 : 0;
  const minutes = elapsed > 0 ? elapsed / 60 : 0;
  const wpm = minutes > 0 ? (correct / 5) / minutes : 0;

  // When time is up, submit score if user is logged in
  useEffect(() => {
    if (seconds === 0 && !hasSubmittedThisRound && user) {
      const payload = {
        user_id: user.user_id,
        wpm: Number(wpm.toFixed(1)),
        accuracy: Number(accuracy.toFixed(1)),
      };

      const submitScore = async () => {
        try {
          const res = await fetch("http://127.0.0.1:8000/scores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            console.error("Score submit failed:", data);
          } else {
            console.log("Score submitted:", payload);
          }
        } catch (err) {
          console.error("Error submitting score:", err);
        } finally {
          setHasSubmittedThisRound(true);
        }
      };

      submitScore();
    }
  }, [seconds, hasSubmittedThisRound, user, wpm, accuracy]);

  return (
    <div className="text-[#fffffffb] text-2xl font-[Quantico]">
      <div className="flex flex-col justify-center items-center mt-25">
  
        <div className="flex items-center gap-200 mb-2">
          <button className="text-white text-3xl">{seconds}</button>
          <button
            onClick={handleReset}
            className="px-4 py-1 border border-white/40 rounded-md text-base hover:bg-white/10 hover:cursor-pointer"
          >
            Reset
          </button>
        </div>

        
        <div className="flex gap-8 text-lg m-5">
          <div>
            <span className="text-white">Accuracy: </span>
            {accuracy.toFixed(1)}%
          </div>
          <div>
            <span className="text-white">WPM: </span>
            {wpm.toFixed(1)}
          </div>
        </div>

        {seconds === 0 && (
          <div className="text-red-400 text-lg mb-3 ">
            Time&apos;s up! Press Reset to try again.
          </div>
        )}

        <Typing
          key={round}
          onStart={handleStart}
          isActive={isActive}
          onStatsChange={setStats}
        />

        
        {user ? (
          <div className="mt-10 flex flex-col items-center gap-2">
            <p className="text-xl">Happy typing, {user.username}!</p>
            <button
              onClick={handleSignOut}
              className="px-4 py-2  hover:bg-gray-300 hover:text-black hover:cursor-pointer transition"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="mt-10 px-4 py-2 hover:cursor-pointer rounded hover:bg-gray-300 hover:text-black"
          >
            Log In / Sign Up to Track your stats
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
