"use client";
import React, { useState, useEffect } from 'react';

export default function AIVocabGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // This function "invents" a unique 4-character AI token for any word
  const generateToken = (word: string) => {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = (hash << 5) - hash + word.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    // Turn the math into a cool looking hex-code (AI Vocab)
    return `0x${Math.abs(hash).toString(16).toUpperCase().slice(0, 4)}`;
  };

  useEffect(() => {
    const words = input.toLowerCase().trim().split(/\s+/);
    if (input === "") {
      setOutput("");
      return;
    }
    const aiWords = words.map(word => generateToken(word));
    setOutput(aiWords.join(" "));
  }, [input]);

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace', backgroundColor: '#000', color: '#0f0', minHeight: '100vh' }}>
      <h1>AI VOCAB GENERATOR v1.0</h1>
      <p style={{ color: '#888' }}>Status: Autonomous Vocabulary Generation Active</p>
      
      <textarea
        placeholder="Type here to see the AI generate its own language..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: '100%',
          height: '150px',
          backgroundColor: '#111',
          color: '#0f0',
          border: '1px solid #0f0',
          padding: '10px',
          fontSize: '18px',
          outline: 'none'
        }}
      />

      <div style={{ marginTop: '30px' }}>
        <h3>GENERATED SYNTHETIC VOCAB:</h3>
        <div style={{ 
          padding: '20px', 
          border: '1px dashed #0f0', 
          wordBreak: 'break-all',
          fontSize: '20px',
          minHeight: '50px'
        }}>
          {output}
        </div>
      </div>

      <footer style={{ marginTop: '50px', fontSize: '12px', color: '#444' }}>
        * Every unique word creates a consistent, mathematically derived token.
      </footer>
    </div>
  );
}
