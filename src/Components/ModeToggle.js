import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import SortableChord from './SortableChord.js';

function ModeToggle({ isRandom, setIsRandom, selectedChords, handleDragEnd }) {
  return (
    <div>
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
    
        <button onClick={() => setIsRandom(true)} disabled={isRandom}>Random</button>
        <button onClick={() => setIsRandom(false)} disabled={!isRandom}>Ordered</button>
      </div>
  );
}

export default ModeToggle;