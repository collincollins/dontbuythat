// src/App.js

import React, { useState, useRef } from 'react';
import coffeeButton from './components/img/buy-me-a-coffee-button.png';
import Navbar from './components/Navbar';
import InputForm from './components/InputForm';
import Results from './components/Results';
import Card from './components/Card';

function App() {
  const [entry, setEntry] = useState(null);
  const [showCoffeeButton, setShowCoffeeButton] = useState(false);
  const [threeDollarsFutureValue, setThreeDollarsFutureValue] = useState(0);

  // 1. Create a ref for the results section
  const resultsRef = useRef(null);

  // called by InputForm once validation passes
  const handleAddEntry = (newEntry) => {
    // debug: confirm we're getting correct values
    console.log('New entry:', newEntry);
    console.log(
      'Years difference:',
      newEntry.retirementAge - newEntry.currentAge
    );

    // update state
    setEntry(newEntry);
    setShowCoffeeButton(true);

    // run the "3 dollar" future value calc
    calculateThreeDollarsFutureValue(
      newEntry.retirementAge - newEntry.currentAge
    );

    // 2. After setting entry, scroll to results (small timeout to ensure render)
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // helper function for the coffee calculation
  const calculateThreeDollarsFutureValue = (years) => {
    const P = 3; // principal
    const r = 0.08; // 8% interest
    const n = years; // number of years

    const FV = P * Math.pow(1 + r, n);
    console.log(`Calculating with P=${P}, years=${n}, result=${FV}`);

    setThreeDollarsFutureValue(FV.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* navbar */}
      <Navbar />

      {/* main content */}
      <main className="flex-grow w-full max-w-screen-md mx-auto px-4">
        <Card className="mb-8">
          <InputForm onAddEntry={handleAddEntry} />
        </Card>

        {/* 3. Attach the ref to the wrapper around Results */}
        {entry && (
          <div ref={resultsRef}>
            <Card>
              <Results entry={entry} />
            </Card>
          </div>
        )}
      </main>

      {/* footer */}
      <footer className="w-full bg-white shadow-md mt-8 rounded-t-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col items-center space-y-4">
          <span className="text-gray-500 text-sm">Made by Collin</span>

          {showCoffeeButton && (
            <>
              <a
                href="https://www.buymeacoffee.com/B4Aaol3SrI"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={coffeeButton}
                  alt="Buy Me A Coffee"
                  style={{ height: '60px', width: '217px' }}
                />
              </a>
              <span className="text-gray-500 text-sm italic">
                *or don't and have ${threeDollarsFutureValue} in retirement
              </span>
            </>
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;