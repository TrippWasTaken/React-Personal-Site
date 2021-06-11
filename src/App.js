import './App.css';
import Header from './components/Header'
import VidList from './components/VidList';

function App() {
  return (
    <div className="mainCont">
      <Header />
      <div className = "vidListCont">
      <VidList />
      </div>
    </div>
  );
}

export default App;
