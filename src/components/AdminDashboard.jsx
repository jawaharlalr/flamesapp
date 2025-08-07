import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Users,
  Smile,
  HeartHandshake,
  Skull,
  User,
  LogOut,
  Trash2,
} from "lucide-react";

export default function AdminDashboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, "flames_results"),
      orderBy("timestamp", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEntries(docs);
        setLoading(false);
      },
      () => setLoading(false)
    );

    return () => unsub();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "flames_results", id));
    } catch {}
  };

  const formatTimestamp = (ts) => {
    try {
      return ts?.toDate ? ts.toDate().toLocaleString() : "";
    } catch {
      return "";
    }
  };

  const getResultIcon = (result) => {
    switch (result?.toLowerCase()) {
      case "love":
        return <Heart className="inline w-4 h-4 text-red-500" />;
      case "friend":
        return <Users className="inline w-4 h-4 text-blue-500" />;
      case "affection":
        return <Smile className="inline w-4 h-4 text-yellow-500" />;
      case "marriage":
        return <HeartHandshake className="inline w-4 h-4 text-pink-600" />;
      case "enemy":
        return <Skull className="inline w-4 h-4 text-gray-700" />;
      case "sister":
        return <User className="inline w-4 h-4 text-purple-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100">
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-pink-600">Ol Vita Avan Nilamaigal</h2>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            <LogOut className="w-4 h-4 mr-2" /> Velapoda
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : entries.length === 0 ? (
          <p className="text-center text-gray-500">
            No FLAMES results found or failed to load.
          </p>
        ) : (
          <div className="space-y-4">
            {entries.map(({ id, name1, name2, result, timestamp }, index) => (
              <div
                key={id}
                className="flex items-center justify-between p-4 transition border rounded shadow-sm bg-gray-50 hover:bg-gray-100"
              >
                <div>
                  <p className="text-sm text-gray-400">S.No: {index + 1}</p>
                  <p className="text-lg">
                    <span className="font-semibold text-blue-700">{name1}</span>{" "}
                    ❤️{" "}
                    <span className="font-semibold text-pink-700">{name2}</span>
                  </p>
                  <p className="flex items-center gap-1 text-sm text-gray-600">
                    Result:{" "}
                    <span className="flex items-center gap-1 font-semibold text-purple-600">
                      {getResultIcon(result)} {result}
                    </span>
                  </p>
                  {timestamp && (
                    <p className="text-sm text-gray-400">
                      {formatTimestamp(timestamp)}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
