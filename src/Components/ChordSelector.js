

function ChordSelector({ selectedChords,toggleChord }) {
    const chords = ['C', 'G', 'Am', 'F', 'D', 'Em', 'A', 'E'];

    return (
        <div>
            {chords.map(chord => (
                <button key={chord} onClick={() => toggleChord(chord)}>{chord}</button>
            ))}
        </div>
    );
}

export default ChordSelector;



