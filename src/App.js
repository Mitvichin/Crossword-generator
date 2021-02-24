import './App.css';
import { CrosswordLayout } from './components/crossword/crossword_layout/CrosswordLayout';

function App() {
  const grid = [
    ['r', 'o', 'o', 'm'],
    ['a', '', '', 'o'],
    ['t', '', '', 'u'],
    ['', '', '', 's'],
    ['', '', '', 'e']
  ];
  console.log(grid)
  return (
    <div className="App">
      <CrosswordLayout grid={grid} />
    </div>
  );
}

export default App;
