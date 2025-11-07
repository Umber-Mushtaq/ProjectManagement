import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialData = {
  todo: ["Design UI", "Setup Backend", "Write Docs"],
  inProgress: ["Integrate API"],
  done: ["Deploy App"],
};

function KanbanBoard() {
  const [tasks, setTasks] = useState(initialData);

  // 🔁 Function runs when a drag ends
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside any column
    if (!destination) return;

    // If dropped in same place, no change
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // 🧱 Copy the source column's tasks
    const sourceTasks = Array.from(tasks[source.droppableId]);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    // 🧱 Copy the destination column's tasks
    const destTasks = Array.from(tasks[destination.droppableId]);
    destTasks.splice(destination.index, 0, movedTask);

    // 🔄 Update the state
    setTasks({
      ...tasks,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destTasks,
    });
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(tasks).map(([columnId, columnTasks]) => (
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: "#f3f3f3",
                  padding: 10,
                  width: 250,
                  borderRadius: 8,
                }}
              >
                <h3 style={{ textTransform: "capitalize" }}>{columnId}</h3>
                {columnTasks.map((task, index) => (
                  <Draggable draggableId={task} index={index} key={task}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: "none",
                          padding: 10,
                          marginBottom: 8,
                          background: "white",
                          borderRadius: 5,
                          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {task}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;
