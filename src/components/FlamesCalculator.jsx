import { useState, useEffect } from "react";
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

const flamesIcons = {
  Love: <Heart className="text-red-500 w-10 h-10" title="Love" />,
  Enemy: <Swords className="text-gray-700 w-10 h-10" title="Enemy" />,
  Sister: <Users className="text-yellow-500 w-10 h-10" title="Sister" />,
  Friends: <Handshake className="text-green-500 w-10 h-10" title="Friends" />,
  Marriage: <Gem className="text-pink-600 w-10 h-10" title="Marriage" />,
  Affection: <Smile className="text-blue-500 w-10 h-10" title="Affection" />,
};

export default function FlamesCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (name1.trim() === "" || name2.trim() === "") {
      setResult("");
    }
  }, [name1, name2]);

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
    }, 1500); // simulate loading
  };

  const handleReset = () => {
    setName1("");
    setName2("");
    setResult("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full p-6 bg-white shadow-xl rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">🔥 FLAMES Calculator</h2>

        <input
          type="text"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          placeholder="Enter Your Name"
          className="w-full p-2 border mb-2 rounded"
        />
        <input
          type="text"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          placeholder="Enter Partner's Name"
          className="w-full p-2 border mb-4 rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-5 h-5" />
              Calculating...
            </div>
          ) : (
            "Calculate"
          )}
        </button>

        {result && (
          <div className="mt-6 text-center">
            <p className="text-xl mb-2 flex justify-center items-center gap-2">
               Result
              <button
                onClick={handleReset}
                className="text-gray-500 hover:text-red-500"
                title="Reset"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </p>
            <div className="flex justify-center">{flamesIcons[result]}</div>
            <p className="mt-1 text-sm text-gray-600">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
