import "./App.css";
import {DndContext, closestCenter, KeyboardSensor, PointerSensor, TouchSensor, useSensors,  useSensor, DragStartEvent, DragEndEvent} from '@dnd-kit/core';
import {
  // arrayMove,
  // SortableContext,
  sortableKeyboardCoordinates,
  // rectSortingStrategy,
} from "@dnd-kit/sortable";


// import {Draggable} from './Draggable';
// import {Droppable} from './Droppable';




function App() {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { id } = event.active;

    if (!id) return;

    // const currentItem = galleryData.find((item) => item.id === id);

    // setActiveItem(currentItem || null);
  };
  const handleDragEnd = () => {
    // setActiveItem(null);
    // const { active, over } = event;

    // if (!over) {
    //   return;
    // }
  }

  return (
    <div className="min-h-screen">
      <div className="container flex flex-col items-center">
        <div className="bg-white my-8 rounded-lg shadow max-w-5xl grid">
          <header  className="text-2xl">Showcase</header>
          <DndContext
                       sensors={sensors}
                       collisionDetection={closestCenter}
                       onDragStart={handleDragStart}
                       onDragEnd={handleDragEnd}
           
          >
            {/* <Draggable />
            <Droppable /> */}
          </DndContext>
        </div>
      </div>
    </div>
  );
}

export default App;
