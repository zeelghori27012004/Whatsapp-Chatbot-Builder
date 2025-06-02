import React, { useEffect, useState } from "react";
import { getBots, createBot, updateBot, deleteBot } from "../services/botService";

export default function MyBots() {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newBotName, setNewBotName] = useState("");
  const [editingBotId, setEditingBotId] = useState(null);
  const [editingBotName, setEditingBotName] = useState("");

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getBots();
      const sortedBots = data.sort((a, b) => a.name.localeCompare(b.name));
      setBots(sortedBots);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBot = async () => {
    if (!newBotName.trim()) return;
    try {
      const data = await createBot({ name: newBotName, flow: {}, usage: 0 });
      setNewBotName("");
      setBots((prev) => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteBot = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bot?")) return;
    try {
      await deleteBot(id);
      setBots((prev) => prev.filter((bot) => bot._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const startEditing = (id, name) => {
    setEditingBotId(id);
    setEditingBotName(name);
  };

  const cancelEditing = () => {
    setEditingBotId(null);
    setEditingBotName("");
  };

  const saveEditing = async (id) => {
    if (!editingBotName.trim()) return alert("Bot name cannot be empty");
    try {
      await updateBot(id, { name: editingBotName });
      setBots((prev) =>
        prev
          .map((bot) => (bot._id === id ? { ...bot, name: editingBotName } : bot))
          .sort((a, b) => a.name.localeCompare(b.name))
      );
      cancelEditing();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-24">
      <h1 className="text-3xl font-bold mb-6">My Bots</h1>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="New bot name"
          value={newBotName}
          onChange={(e) => setNewBotName(e.target.value)}
          className="flex-grow px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleCreateBot}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Bot
        </button>
      </div>

      {loading ? (
        <p>Loading bots...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : bots.length === 0 ? (
        <p>No bots found. Create one above!</p>
      ) : (
        <ul className="space-y-4">
          {bots.map((bot) => (
            <li
              key={bot._id}
              className="flex items-center justify-between border p-4 rounded shadow"
            >
              {editingBotId === bot._id ? (
                <>
                  <input
                    type="text"
                    value={editingBotName}
                    onChange={(e) => setEditingBotName(e.target.value)}
                    className="flex-grow px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 mr-4"
                  />
                  <button
                    onClick={() => saveEditing(bot._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-grow font-semibold">{bot.name}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => startEditing(bot._id, bot.name)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBot(bot._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
