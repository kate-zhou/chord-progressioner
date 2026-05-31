//use state is how react remembers things
import { useState, useEffect } from 'react';
import './App.css';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import SortableChord from './Components/SortableChord.js';


function App() {
  //Creates a list of available chords for choosing
  const chords = ['C', 'G', 'Am', 'F', 'D', 'Em', 'A', 'E'];
  //we set selectedChords(array) to nothing, and whenever we call 
  //setSelectedChords it would update selectedChords
  const [selectedChords, setSelectedChords] = useState([]);
  //we set isRunning(boolean) to false, 
  //and whenever we call setIsRunning it would update isRunning
  const [isRunning, setIsRunning] = useState(false);
  //Timer running for every chord
  const [timeLeft, setTimeLeft] = useState(10);
  //The current chord being practiced
  const [currentChord, setCurrentChord] = useState(null);
  //Whether to select chords randomly or in order
  const [isRandom, setIsRandom] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);


  //useEffect runs something whenever isRunning changes, 
  //in this case it runs a timer that decreases timeLeft by 1 every second
  useEffect(() => {
    //if not running, do nothing and return
    if (!isRunning) return;

    //else every 1000 milliseconds (1 second), decrease timeLeft by 1
    const interval = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    //once hit stop we reset the interval
    return () => clearInterval(interval);
  }, [isRunning]);

  //This useEffect runs on time left
  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft === 0) {
      const randomChord = selectedChords[Math.floor(Math.random() * selectedChords.length)];
      setCurrentChord(randomChord);
      setTimeLeft(10);
    }
  }, [timeLeft]);

  //creates a function toggleChord with parameter chord
  const toggleChord = (chord) => {
    //if the chord is already in selectedChords, we remove it by filtering it out
    if (selectedChords.includes(chord)) {
      //creates a new array that includes all the chords that is not the one selected
      setSelectedChords(selectedChords.filter(c => c !== chord));
      //if the chord is not in selectedChords, 
      // we add it by creating a new array with the existing chords and the new chord
    } else {
      setSelectedChords([...selectedChords, chord]);
    }
  };

  const getNextChord = () => {
    if (isRandom) {
      return selectedChords[Math.floor(Math.random() * selectedChords.length)];
    } else {
      let next;
      setCurrentIndex(prev => {
        const nextIndex = (prev + 1) % selectedChords.length;
        next = nextIndex;
        return nextIndex;
      });
      return selectedChords[next];
    }
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = selectedChords.indexOf(active.id);
      const newIndex = selectedChords.indexOf(over.id);
      setSelectedChords(arrayMove(selectedChords, oldIndex, newIndex));
    }
  };

  return (
    <div>
      <h1>Chord Practice</h1>
      <div>
        {/*chords.map loops through all the chords
        chord => means for each chord
        key={chord} react's way of tracking elements
        */}
        {chords.map(
          chord =>
            (<button key={chord} onClick={() => toggleChord(chord)}>{chord}</button>)
        )
        }
      </div>

      {/*displays the selected chords by joining them with a comma and space*/}
      <p>Selected: {selectedChords.join(', ')}</p>
      <div>
        <button onClick={() => setIsRandom(true)} disabled={isRandom}>Random</button>
        <button onClick={() => setIsRandom(false)} disabled={!isRandom}>Ordered</button>
      </div>
      <button onClick={() => {
        if (!isRunning && selectedChords.length > 0) {
          const randomChord = selectedChords[Math.floor(Math.random() * selectedChords.length)];
          setCurrentChord(randomChord);
          setTimeLeft(10);
        }
        setIsRunning(!isRunning);
      }}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      {!isRandom && selectedChords.length > 0 && (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={selectedChords} strategy={horizontalListSortingStrategy}>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              {selectedChords.map(chord => (
                <SortableChord key={chord} chord={chord} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
      {isRunning && <p>Time left: {timeLeft}</p>}
      {currentChord && <h2>Play: {currentChord}</h2>}
    </div>
  );
}

export default App;
