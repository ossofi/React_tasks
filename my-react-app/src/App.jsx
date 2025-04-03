const items = ["item 1", "item 2", "item 3"];
function App() {

  return (
    <div>
      <h1>list</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
