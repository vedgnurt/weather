import { twMerge } from "tailwind-merge";
import { FaRegClock } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

import { Location, TimeDisplay, TodayDay } from "./components";

const App = () => {
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
                <div className={twMerge("flex items-center justify-between")}>
                    <div className={twMerge("flex gap-1 items-center")}>
                        <IoLocationOutline size={19} />
                        <Location />
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
                </div>
                <div></div>
            </div>
        </section>
    );
};

export default App;
