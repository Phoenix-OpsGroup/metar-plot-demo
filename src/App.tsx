import SideBar from "./components/SideBar"
import MetarBar from "./components/MetarBar"
import Display from './components/Display';

export default function App() {
  return (
    <div>
      <MetarBar></MetarBar>
      <SideBar></SideBar>
      <Display></Display>
    </div>
  );
}
