import Calendar from "./components/Calendar";

function App() {
  return (
    <div style={{ margin: 40 }}>
      <Calendar
        dates={[
          new Date(2023, 9, 14),
          new Date(2023, 9, 15),
          new Date(2023, 9, 16),
        ]}
        startTime={9}
        endTime={18}
      />
    </div>
  );
}

export default App;
