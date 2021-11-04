import { FaDesktop, FaWind, FaCloudSun } from 'react-icons/fa'
import { Subject } from 'rxjs';

export const Displays = {
  METAR: "metar",
  WEATHER: "weather",
  WIND: "wind"
}

export type DisplayState = { display: string }
export const displayControl = new Subject<DisplayState>()

export default function SideBar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-red-900">
      <div className="sidebar-icon" onClick={() => setDisplay(Displays.METAR)}><FaDesktop size="28" /></div>
      <div className="sidebar-icon" onClick={() => setDisplay(Displays.WEATHER)}><FaWind size="28" /></div>
      <div className="sidebar-icon" onClick={() => setDisplay(Displays.WIND)}><FaCloudSun size="28" /></div>
    </div>
  );
}

function setDisplay(state: string) {
  displayControl.next({ display: state })
}

