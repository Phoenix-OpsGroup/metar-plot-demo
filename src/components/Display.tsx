import { Component } from "react";
import { MetarBarState, metarData } from "./MetarBar";
import { displayControl, DisplayState, Displays } from "./SideBar";
import { rawMetarToSVG, parseMetar, getWeatherLegend, WEATHER, genWind, MetarPlot } from "metar-plot";

export default class Display extends Component<unknown, DisplayState, unknown> {
    state: DisplayState = { display: "metar" }

    componentDidMount() {
        displayControl.subscribe(
            (data) => {
                this.setState(data)
            }
        )
    }

    render() {
        switch (this.state.display) {
            case Displays.METAR:
                return (<MetarDisplay></MetarDisplay>)
            case Displays.WEATHER:
                return (<WindLegend></WindLegend>)
            case Displays.WIND:
                return (<WeatherLegend></WeatherLegend>)
            default:
                return (<MetarDisplay></MetarDisplay>)
        }
    }
}

class MetarDisplay extends Component<unknown, MetarBarState, unknown>{

    state: MetarBarState = { metar: "KBOS 031754Z 27008KT 10SM SCT050 10/M02 A3015 RMK AO2 SLP207 T01001022 10111 20056 58012" }

    private metarString: string = "";
    private us_metar: string = "";
    private un_metar: string = "";

    componentDidMount() {
        metarData.subscribe(
            (data) => {
                this.setState(data)
            }
        )
    }

    setupRender() {
        try {
            this.metarString = JSON.stringify(parseMetar(this.state.metar), null, 3)
            let blob1 = new Blob([rawMetarToSVG(this.state.metar, "350px", "350px")], { type: 'image/svg+xml' });
            let blob2 = new Blob([rawMetarToSVG(this.state.metar, "350px", "350px", true)], { type: 'image/svg+xml' })
            this.us_metar = URL.createObjectURL(blob1);
            this.un_metar = URL.createObjectURL(blob2)
        } catch {
            this.metarString = "Invalid Metar"
            this.us_metar = ""
            this.un_metar = ""
        }
    }

    render() {
        this.setupRender()
        return (
            <div className="w-full h-screen pl-16 pt-14">
                <div className="w-full h-full p-2 dark:bg-gray-500 grid gap-2 grid-cols-2">
                    <div className="row-span-2 card-base">
                        <div className="card-banner">
                            <span className="m-4 align-middle">Parsed METAR</span>
                        </div>
                        <div className="card-content">
                            <pre className="dark:text-gray-200">
                                {this.metarString}
                            </pre>
                        </div>
                    </div>

                    <div className="card-base">
                        <div className="card-banner">
                            <span className="m-4 align-middle">🇺🇸 METAR</span>
                        </div>
                        <div className="card-content flex flex-wrap content-center justify-center">
                            <img src={this.us_metar} />
                        </div>
                    </div>

                    <div className="card-base">
                        <div className="card-banner">
                            <span className="m-4 align-middle">🇺🇳 METAR</span>
                        </div>
                        <div className="card-content flex flex-wrap content-center justify-center">
                            <img src={this.un_metar} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class WindLegend extends Component {
    render() {
        let svg_start = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" viewBox=\"0 0 500 500\">"
        let barb1 =URL.createObjectURL(new Blob([ svg_start + genWind({wind_speed: 5, wind_direction: 90})+"</svg>"], { type: 'image/svg+xml' })) 
        let barb2 =URL.createObjectURL(new Blob([ svg_start + genWind({wind_speed: 10, wind_direction: 90})+"</svg>"], { type: 'image/svg+xml' })) 
        let barb3 =URL.createObjectURL(new Blob([ svg_start + genWind({wind_speed: 15, wind_direction: 90})+"</svg>"], { type: 'image/svg+xml' })) 
        let barb4 =URL.createObjectURL(new Blob([ svg_start + genWind({wind_speed: 20, wind_direction: 90})+"</svg>"], { type: 'image/svg+xml' })) 
        let barb5 =URL.createObjectURL(new Blob([ svg_start + genWind({wind_speed: 25, wind_direction: 90})+"</svg>"], { type: 'image/svg+xml' }))
        let barb6 =URL.createObjectURL(new Blob([ svg_start + genWind({wind_speed: 30, wind_direction: 90})+"</svg>"], { type: 'image/svg+xml' }))
        let barb7 =URL.createObjectURL(new Blob([ svg_start + genWind({wind_speed: 35, wind_direction: 90})+"</svg>"], { type: 'image/svg+xml' }))
        let barb8 =URL.createObjectURL(new Blob([ svg_start + genWind({wind_speed: 40, wind_direction: 90})+"</svg>"], { type: 'image/svg+xml' }))
        let barb9 =URL.createObjectURL(new Blob([ svg_start + genWind({wind_speed: 45, wind_direction: 90})+"</svg>"], { type: 'image/svg+xml' }))
        let barb10 =URL.createObjectURL(new Blob([ svg_start + genWind({wind_speed: 50, wind_direction: 90})+"</svg>"], { type: 'image/svg+xml' }))
        let barb11 =URL.createObjectURL(new Blob([ svg_start + genWind({wind_speed: 55, wind_direction: 90})+"</svg>"], { type: 'image/svg+xml' }))
        let barb12 =URL.createObjectURL(new Blob([ svg_start + genWind({wind_speed: 60, wind_direction: 90})+"</svg>"], { type: 'image/svg+xml' }))
        return (
            <div className="w-full h-1/3 pl-16 pt-14 dark:bg-gray-500">
                <div className="card-base m-2">
                    <div className="card-banner">
                        <span className="m-4 align-middle">Wind speed</span>
                    </div>
                    <div className="card-content flex flex-wrap">
                        <div>
                            <img  src={barb1} alt=""></img>
                            <div className="text-center">5 Knots</div>
                        </div>
                        <div>
                            <img  src={barb2} alt=""></img>
                            <div className="text-center">10 Knots</div>
                        </div>
                        <div>
                            <img  src={barb3} alt=""></img>
                            <div className="text-center">15 Knots</div>
                        </div>
                        <div>
                            <img  src={barb4} alt=""></img>
                            <div className="text-center"> 20 Knots</div>
                        </div>
                        <div>
                            <img  src={barb5} alt=""></img>
                            <div className="text-center">25 Knots</div>
                        </div>
                        <div>
                            <img  src={barb6} alt=""></img>
                            <div className="text-center">30 Knots</div>
                        </div>
                        <div>
                            <img  src={barb7} alt=""></img>
                            <div className="text-center">35 Knots</div>
                        </div>
                        <div>
                            <img  src={barb8} alt=""></img>
                            <div className="text-center">40 Knots</div>
                        </div>
                        <div>
                            <img  src={barb9} alt=""></img>
                            <div className="text-center">45 Knots</div>
                        </div>
                        <div>
                            <img  src={barb10} alt=""></img>
                            <div className="text-center">50 Knots</div>
                        </div>
                        <div>
                            <img  src={barb11} alt=""></img>
                            <div className="text-center">55 Knots</div>
                        </div>
                        <div>
                            <img  src={barb12} alt=""></img>
                            <div className="text-center">60 Knots</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class WeatherLegend extends Component {
    render() {
        return (
            <div className="w-full h-screen pl-16 pt-14 dark:bg-gray-500">
                <div className="card-base p-2">
                    <div className="card-banner">
                        <span className="m-4 align-middle">Weather Symbols</span>
                    </div>
                    <div className="card-content w-full h-full grid gap-2 p-2 lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-3 overflow-y-scroll">
                        {Object.keys(WEATHER).map(
                            wx => {
                                const svg = URL.createObjectURL(new Blob([getWeatherLegend(wx)], { type: 'image/svg+xml' }))
                                return (
                                    <div className="h-full bg-gray-300 rounded-lg">
                                        <div className="w-full h-1/5 text-center">{wx}:{WEATHER[wx].text}</div>
                                        <div className="flex flex-wrap content-center h-4/5 justify-center">
                                            <img className="w-16 h-16" src={svg} alt=""></img>
                                        </div>
                                    </div>
                                )
                            }
                        )
                        }
                    </div>
                </div>
            </div>
        )
    }
}