import React, { Component } from 'react';
import { Subject } from 'rxjs';

export const metarData = new Subject<MetarBarState>()
export type MetarBarState = { metar: string }

export default class MetarBar extends Component<unknown, MetarBarState, unknown>{

  state : MetarBarState = { metar: "" }

  render() {
    return (
      <form className="fixed top-0 h-14 w-full md:flex md:items-center pl-16 mb-6 bg-red-800">
        <label className="block text-md font-bold pl-8 pr-8 w-1/12 text-gray-200">
          Metar
        </label>
        <input className="shadow appearance-none border rounded w-11/12 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" 
        id="username" type="text" placeholder="KBOS 031754Z 27008KT 10SM SCT050 10/M02 A3015 RMK AO2 SLP207 T01001022 10111 20056 58012" value={this.state.metar} onChange={evt => this.changeMetar(evt)}></input>
        <div className="w-16 flex content-center justify-center hover:cursor-pointer" >
          <img className="w-10 h-10" onClick={this.openTestData} src="https://www.aviationweather.gov/images/layout/noaa_logo.png"/>
        </div>
      </form>
    );
  }

  private changeMetar(evt: React.ChangeEvent<HTMLInputElement>) {
    let metar = {metar: evt.target.value}
    this.setState(metar)
    metarData.next(metar)
  }

  private openTestData(){
    window.open("https://www.aviationweather.gov/metar/data?ids=@TOP&format=raw&hours=0&taf=off&layout=on", "_blank")?.focus()
  }
}

 