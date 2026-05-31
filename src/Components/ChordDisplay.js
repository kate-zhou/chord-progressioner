function ChordDisplay({ currentChord }) {
    return (
        <div>
            {currentChord && <h2>Play: {currentChord}</h2>}
        </div>
    );
}

export default ChordDisplay;