import "./App.css";
import {DndContext, closestCenter, KeyboardSensor, PointerSensor, TouchSensor, useSensors,  useSensor, DragStartEvent, DragEndEvent} from '@dnd-kit/core';
import {
  arrayMove,
  // arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { IImageGallery } from "./types/global.types";
import { useState } from "react";
import { initialImageData } from "./data";
import ImageCard from "./components/Cards/ImageCard";


// import {Draggable} from './Draggable';
// import {Droppable} from './Droppable';




function App() {
  const [activeItem, setActiveItem] = useState<IImageGallery | null>(null);
  const [galleryData, setGalleryData] = useState(initialImageData);


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

    const currentItem = galleryData.find((item) => item.id === id);

    setActiveItem(currentItem || null);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveItem(null);
    const { active, over } = event;

    if (!over) {
      return;
    }

    if(active.id !== over.id) {
      setGalleryData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items,oldIndex, newIndex)
      })
    }
  }

  const handleSelectImage = (id: string | number) => {
    // if galleryData.isSelected === true then set to false and vice versa
    const newGalleryData = galleryData.map((imageItem) => {
      if (imageItem.id === id) {
        return {
          ...imageItem,
          isSelected: !imageItem.isSelected,
        };
      }

      return imageItem;
    });

    setGalleryData(newGalleryData);
  };

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
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 p-8">
              <SortableContext
                items={galleryData}
                strategy={rectSortingStrategy}
              >
                {galleryData.map((imageItem) => {
                  return (
                    <ImageCard
                      key={imageItem.id}
                      id={imageItem.id}
                      isSelected={imageItem.isSelected}
                      slug={imageItem.slug}
                      onClick={handleSelectImage}
                    />
                  );
                  // return (
                  //   <div><img src={imageItem.slug} alt="" /></div>
                  // )
                })}
              </SortableContext>
              {/* <AddImageCard setGalleryData={setGalleryData} />

              <DragOverlay adjustScale={true} wrapperElement="div">
                {activeItem ? (
                  <ImageOverlayCard
                    className="absolute z-50 h-full w-full"
                    slug={activeItem.slug}
                  />
                ) : null}
              </DragOverlay> */}
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

export default App;
