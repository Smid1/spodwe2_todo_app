import { useState } from "react";

const AddTodo = ({ addTodo }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const input = event.target;
      const text = input.value.trim();
      if (text) {
        addTodo(text);
        input.value = "";
      }
    }
  };

  return (
    <input
      type="text"
      placeholder="Adicione aqui sua nova tarefa"
      onKeyDown={handleKeyPress}
    />
  );
};

const TodoFilter = ({ onFilterChange }) => {
  const handleClick = (filter) => (event) => {
    event.preventDefault(); // Para evitar o comportamento padrão do link
    onFilterChange(filter);
  };

  return (
    <div className="center-content">
      <a href="#" id="filter-all" onClick={handleClick("all")}>
        Todos os itens
      </a>
      <a href="#" id="filter-done" onClick={handleClick("done")}>
        Concluídos
      </a>
      <a href="#" id="filter-pending" onClick={handleClick("pending")}>
        Pendentes
      </a>
    </div>
  );
};

const TodoItem = ({ todo, markTodoAsDone }) => {
  const handleClick = () => {
    markTodoAsDone(todo.id);
  };

  return (
    <>
      {todo.done ? (
        <li style={{ textDecoration: "line-through" }}>{todo.text}</li>
      ) : (
        <li>
          {todo.text}
          <button onClick={handleClick}>Concluir</button>
        </li>
      )}
    </>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: crypto.randomUUID(), text: "Learn React", done: false },
    { id: crypto.randomUUID(), text: "Learn JS", done: true },
  ]);
  const [filter, setFilter] = useState("all"); // Estado para o filtro atual

  const addTodo = (text) => {
    const newTodo = { id: crypto.randomUUID(), text, done: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const markTodoAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: true } : todo
      )
    );
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "done") {
      return todo.done;
    } else if (filter === "pending") {
      return !todo.done;
    }
    return true; // Caso o filtro seja inválido, mostra todos
  });

  return (
    <>
      <h1>Todo List</h1>
      <div className="center-content">
        Versão inicial da aplicação de lista de tarefas para a disciplina SPODWE2
      </div>
      <TodoFilter onFilterChange={handleFilterChange} /> {/* Passa a função para atualizar o filtro */}
      <AddTodo addTodo={addTodo} />
      <ul id="todo-list">
        {filteredTodos.map((todo, index) => (
          <TodoItem key={index} todo={todo} markTodoAsDone={markTodoAsDone} />
        ))}
      </ul>
    </>
  );
};

export { TodoList };