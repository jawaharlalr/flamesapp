import { useState, useEffect, useRef } from "react";
import { calculateFlames } from "../utils/calculateFlames";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import {
  Loader2,
  Heart,
  Swords,
  Users,
  Smile,
  Handshake,
  Gem,
  RotateCw,
} from "lucide-react";

const flamesColors = {
  Love: "bg-gradient-to-br from-red-100 via-red-200 to-pink-100 text-red-800",
  Enemy: "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 text-gray-800",
  Sister: "bg-gradient-to-br from-yellow-100 via-yellow-200 to-amber-100 text-yellow-800",
  Friends: "bg-gradient-to-br from-green-100 via-green-200 to-emerald-100 text-green-800",
  Marriage: "bg-gradient-to-br from-pink-100 via-rose-200 to-fuchsia-100 text-pink-800",
  Affection: "bg-gradient-to-br from-blue-100 via-sky-200 to-indigo-100 text-blue-800",
};

const flamesIcons = {
  Love: <Heart className="w-10 h-10 text-red-500" title="Love" />,
  Enemy: <Swords className="w-10 h-10 text-gray-600" title="Enemy" />,
  Sister: <Users className="w-10 h-10 text-yellow-500" title="Sister" />,
  Friends: <Handshake className="w-10 h-10 text-green-500" title="Friends" />,
  Marriage: <Gem className="w-10 h-10 text-pink-600" title="Marriage" />,
  Affection: <Smile className="w-10 h-10 text-blue-500" title="Affection" />,
};

export default function FlamesCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);

  useEffect(() => {
    if (name1.trim() === "" || name2.trim() === "") {
      setResult("");
    }
  }, [name1, name2]);

  const handleNameChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setter(value);
    }
  };

  const handleSubmit = async () => {
    if (!name1 || !name2) return alert("Please enter both names!");
    setLoading(true);
    setResult("");

    setTimeout(async () => {
      const outcome = calculateFlames(name1, name2);
      setResult(outcome);
      setLoading(false);

      await addDoc(collection(db, "flames_results"), {
        name1,
        name2,
        result: outcome,
        timestamp: Timestamp.now(),
      });
    }, 1500);
  };

  const handleReset = () => {
    setName1("");
    setName2("");
    setResult("");
    input1Ref.current?.focus();
  };

  const handleKeyDownInput1 = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      input2Ref.current?.focus();
    }
  };

  const handleKeyDownInput2 = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all duration-700 ease-in-out ${
        result
          ? flamesColors[result]
          : "bg-gradient-to-r from-rose-100 via-pink-100 to-yellow-100"
      } px-4`}
    >
      <div className="w-full max-w-md p-6 border border-pink-100 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl">
        <h1 className="mb-6 text-3xl font-extrabold tracking-wide text-center text-pink-600 drop-shadow-md">
          FLAMES Podu Santhoshama Padu
        </h1>

        <input
          ref={input1Ref}
          type="text"
          value={name1}
          onChange={handleNameChange(setName1)}
          onKeyDown={handleKeyDownInput1}
          placeholder="Your Name"
          className="w-full p-3 mb-3 transition-all border border-pink-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          ref={input2Ref}
          type="text"
          value={name2}
          onChange={handleNameChange(setName2)}
          onKeyDown={handleKeyDownInput2}
          placeholder="Partner's Name"
          className="w-full p-3 mb-5 transition-all border border-pink-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-2 font-bold text-white transition-all duration-300 bg-pink-500 rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Calculating...
            </div>
          ) : (
            "Calculate"
          )}
        </button>

        {result && (
          <div className="mt-8 text-center transition-opacity duration-500 ease-in-out">
            <p className="flex items-center justify-center gap-2 mb-3 text-2xl font-semibold">
              Result
              <button
                onClick={handleReset}
                className="text-gray-400 transition hover:text-red-500"
                title="Reset"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </p>
            <div className="flex justify-center">{flamesIcons[result]}</div>
            <p className="mt-3 text-2xl font-bold tracking-wide capitalize">
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
