import React, { useState, useEffect } from "react";
import "../styles/Quotes.css";

const quotesList = [
  "Success usually comes to those who are too busy to be looking for it.",
//   "Don’t be afraid to give up the good to go for the great.",
//   "Opportunities don’t happen. You create them.",
//   "Success is not in what you have, but who you are.",
//   "The way to get started is to quit talking and begin doing.",
  "Mohsin is the Boss of our company",
  "Abrar is a Hardworking MERN Stack Developer in our company",
  "Awais is a very good Web Designer"

];

const Quotes = () => {
  const [currentQuote, setCurrentQuote] = useState("");
  const [fullQuote, setFullQuote] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typeInterval = setInterval(() => {
      if (charIndex < fullQuote.length) {
        setCurrentQuote((prev) => prev + fullQuote[charIndex]);
        setCharIndex(charIndex + 1);
      } else {
        clearInterval(typeInterval);
        // Show next quote after a delay
        setTimeout(() => {
          const nextIndex = (quoteIndex + 1) % quotesList.length;
          setQuoteIndex(nextIndex);
          setFullQuote(quotesList[nextIndex]);
          setCurrentQuote("");
          setCharIndex(0);
        }, 3000); // 3-second delay before showing the next quote
      }
    }, 100); // Typing speed: 100ms per character

    return () => clearInterval(typeInterval);
  }, [charIndex, fullQuote, quoteIndex]);

  useEffect(() => {
    setFullQuote(quotesList[quoteIndex]);
  }, [quoteIndex]);

  return (
    <div className="quotes-section">
      <div className="quote">
        <span>{currentQuote}</span>
        <span className="cursor">|</span>
      </div>
    </div>
  );
};

export default Quotes;
