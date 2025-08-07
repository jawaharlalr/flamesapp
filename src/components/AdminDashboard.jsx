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

export default function AdminDashboard() {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, "flames_results"),
      orderBy("timestamp", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setEntries(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "flames_results", id));
  };

  const formatTimestamp = (ts) => {
    if (!ts?.toDate) return "";
    return ts.toDate().toLocaleString(); // local time + date
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🛠 Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {entries.length === 0 ? (
        <p className="text-center text-gray-500">No FLAMES results found.</p>
      ) : (
        <div className="space-y-4">
          {entries.map(({ id, name1, name2, result, timestamp }) => (
            <div
              key={id}
              className="border p-4 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <p>
                  <span className="font-semibold">{name1}</span> ❤️{" "}
                  <span className="font-semibold">{name2}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Result: <strong>{result}</strong>
                </p>
                {timestamp && (
                  <p className="text-sm text-gray-400">
                    {formatTimestamp(timestamp)}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDelete(id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
