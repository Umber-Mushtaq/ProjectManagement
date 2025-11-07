import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useGetTasks } from "../user_hooks/useGetTasks";
import { useTaskStatus } from "../user_hooks/useTaskStatus";

const initialData = {
  todo: [],
  inProgress: [],
  done: [],
};

function TaskBoard() {
  const { getTasks } = useGetTasks();
  const { updateStatus } = useTaskStatus();
  const [tasks, setTasks] = useState(initialData);

  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const sourceTasks = Array.from(tasks[source.droppableId]);
    const [movedTask] = sourceTasks.splice(source.index, 1);
    const destTasks = Array.from(tasks[destination.droppableId]);
    destTasks.splice(destination.index, 0, movedTask);
    setTasks({
      ...tasks,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destTasks,
    });
    await updateStatus(movedTask._id, destination.droppableId);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksArray = await getTasks();
      console.log(tasksArray);
      if (Array.isArray(tasksArray)) {
        const todos = tasksArray.filter((t) => t.status === "todo");
        const inProgress = tasksArray.filter((t) => t.status === "inProgress");
        const done = tasksArray.filter((t) => t.status === "done");

        setTasks({ todo: todos, inProgress, done });
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className='flex-col space-y-3 md:flex md:flex-row gap-6 m-5 px-5 w-full justify-center'>
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(tasks).map(([columnId, columnTasks]) => (
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='bg-rose-100 py-3 px-5 rounded-lg w-full'
              >
                <h3 className='text-2xl text-rose-600 capitalize py-2'>
                  {columnId}
                </h3>
                {columnTasks.map((task, index) => (
                  <Draggable
                    draggableId={task._id}
                    index={index}
                    key={task._id}
                  >
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
                        <h2 className='text-purple-600'>{task.name}</h2>
                        <h2 className='text-gray-400 text-sm'>
                          {task.description}
                        </h2>
                        <h2 className='text-rose-400'>
                          Due Date:{" "}
                          {new Date(task.dueDate).toLocaleDateString()}
                        </h2>
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

export default TaskBoard;
