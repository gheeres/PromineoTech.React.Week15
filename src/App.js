import './App.css';
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom';
import Home from './pages/Home';
import Countries from './pages/Countries';
import Country from './pages/Country';
import Cities from './pages/Cities';
import Languages from './pages/Languages';

const TAG = 'App';

export default function App(props) {
  console.log(`${ TAG }.ctor()`);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route path="/countries">
          <Route index element={ <Countries /> } />
          <Route path=":country" element={ <Country /> } />
        </Route>
        <Route path="/cities" element={ <Cities /> } />
        <Route path="/languages" element= { <Languages /> } />
      </Routes>
    </Router>
  );
}