import React from "react";

interface ActiveTodoListProps {
  id: number;
  todo: string;
  dateTime: string;
  markCompelte: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const ActiveTodoList = (props: ActiveTodoListProps) => {
  return (
    <li className="border_set">
        <div className="flex-1 pl-1 mr-16">
          <div className="font-medium">{props.todo}</div>
          <div className="font-medium">{props.dateTime}</div>
        </div>
        <button onClick={() => props.markCompelte(props.id)} className="bg-blue-500 hover:bg-blue-700 btn">
          Mark Completed
        </button>
        <button onClick={() => props.deleteTodo(props.id)} className="bg-red-500 hover:bg-red-700 btn">
          Delete
        </button>
    </li>
  );
};

export default ActiveTodoList;
