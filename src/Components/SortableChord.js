import {useSortable} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


function SortableChord({ chord }) {

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: chord });


  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    padding: '8px',
    border: '1px solid black',
    margin: '4px',
    display: 'inline-block',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {chord}
    </div>
  );
}

export default SortableChord;