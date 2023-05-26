"use client";
import { useState } from "react";

interface Synonym {
  word: string;
  score: number;
}

export default function Home() {
  const [word, setWord] = useState<string>("");
  const [results, setResults] = useState<Synonym[]>([]);
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "https://api.datamuse.com";
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/words?rel_syn=${word}`);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSynonymClick = async (newWord : string) => {
    setWord(newWord)
    try {
      const response = await fetch(`${BASE_URL}/words?rel_syn=${newWord}`);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="searchBar">
        <form onSubmit={handleSubmit}>
          <label htmlFor="word">Your Word</label>
          <input
            type="text"
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="results">
        {results.length ? (
          <ul>
            {results.map((syn, i) => (
              <li key={i} onClick={() => handleSynonymClick(syn.word)}>{syn.word}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
