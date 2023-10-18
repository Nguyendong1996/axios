import './App.css';
import ListStudent from "./components/ListStudent";
import {Route, Routes} from "react-router-dom";
import Create from "./components/Create";
import Update from "./components/Update";
import AppFile from "./file/AppFile";

function App() {
  return (
      <Routes>
        <Route path={'/'} element={<AppFile/>}></Route>
        <Route path={'/create'} element={<Create/>}></Route>
        <Route path={'/update/:id'} element={<Update/>}></Route>
      </Routes>
  );
}

export default App;
