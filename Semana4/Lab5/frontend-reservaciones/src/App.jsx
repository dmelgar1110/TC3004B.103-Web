import ReservationList from "./components/ReservationList";
import ReservationListIA from "./components/ReservationListIA";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Administrador de Reservaciones Yo</h1>
      </header>
      <main>
        <ReservationList />
        <h1>Administrador de Reservaciones IA</h1>
        <ReservationListIA />
      </main>
      <footer>
        <p>CRUD de Reservaciones © 2026</p>
      </footer>
    </div>
  );
}

export default App;
