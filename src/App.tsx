import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { twMerge } from "tailwind-merge";
import { FaRegClock } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

import { Location, TimeDisplay, TodayDay } from "./components";

const App = () => {
    const [location, setLocation] = useState("");

    const { data: locationWeather } = useQuery({
        queryKey: ["weather", location],
        queryFn: async () => {
            const { data } = await axios.get(
                import.meta.env.VITE_WEATHER_API_CALL,
                {
                    params: {
                        q: location,
                        appid: import.meta.env.VITE_WEATHER_API_KEY,
                        units: "metric",
                    },
                }
            );

            return data;
        },
        enabled: location !== "",
        refetchOnWindowFocus: false,
    });

    return (
        <section
            className={twMerge("h-screen", "flex justify-center items-center")}
        >
            <div
                className={twMerge(
                    "w-full max-w-md p-8 space-y-8",
                    "text-white",
                    "rounded-2xl"
                )}
                style={{
                    backgroundImage:
                        "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",
                }}
            >
                <header
                    className={twMerge("flex items-center justify-between")}
                >
                    <div className={twMerge("flex gap-1 items-center")}>
                        <IoLocationOutline size={19} />
                        <Location
                            location={location}
                            setLocation={setLocation}
                        />
                    </div>
                    <div className={twMerge("flex gap-1 items-center")}>
                        <FaRegClock />
                        <div
                            className={twMerge(
                                "flex items-center gap-1",
                                "font-medium text-lg"
                            )}
                        >
                            <div className={twMerge("flex")}>
                                <TodayDay />
                                <span>,</span>
                            </div>
                            <TimeDisplay format="12" />
                        </div>
                    </div>
                </header>
                <section
                    className={twMerge(
                        "flex justify-between items-center gap-4"
                    )}
                >
                    <div className={twMerge("flex items-start")}>
                        <p className={twMerge("text-8xl font-medium")}>
                            {locationWeather.main.temp}
                        </p>
                        <p className={twMerge("text-xl font-semibold", "mt-3")}>
                            &#8451;
                        </p>
                    </div>
                    <img
                        className={twMerge("w-24 aspect-square object-cover")}
                        src={`https://openweathermap.org/img/wn/${locationWeather.weather[0].icon}@2x.png`}
                    />
                    <div className={twMerge("space-y-2")}>
                        <p
                            className={twMerge(
                                "flex items-center gap-1",
                                "text-sm font-semibold"
                            )}
                        >
                            <span
                                className={twMerge(
                                    "first-letter:uppercase",
                                    "text-gray-100/75"
                                )}
                            >
                                mức độ mây:
                            </span>
                            <span>{locationWeather.clouds.all}%</span>
                        </p>
                        <p
                            className={twMerge(
                                "flex items-center gap-1",
                                "text-sm font-semibold"
                            )}
                        >
                            <span
                                className={twMerge(
                                    "first-letter:uppercase",
                                    "text-gray-100/75"
                                )}
                            >
                                độ ẩm:
                            </span>
                            <span>{locationWeather.main.temp}%</span>
                        </p>
                        <p
                            className={twMerge(
                                "flex items-center gap-1",
                                "text-sm font-semibold"
                            )}
                        >
                            <span
                                className={twMerge(
                                    "first-letter:uppercase",
                                    "text-gray-100/75"
                                )}
                            >
                                tốc độ gió:
                            </span>
                            <span>{locationWeather.wind.speed}km/h</span>
                        </p>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default App;
