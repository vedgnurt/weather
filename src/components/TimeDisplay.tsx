import React, { useState, useEffect, useCallback } from "react";

type TimeDisplayProps = {
    format?: "24" | "12";
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ format = "24" }) => {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = useCallback(
        (date: Date, format: "24" | "12"): string => {
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const ampm = hours >= 12 ? "PM" : "AM";
            let displayHours = hours % 12;
            displayHours = displayHours ? displayHours : 12; // "0" giờ chuyển thành 12
            const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
            const displaySeconds = seconds < 10 ? "0" + seconds : seconds;

            if (format === "24") {
                return `${
                    hours < 10 ? "0" + hours : hours
                }:${displayMinutes}:${displaySeconds}`;
            } else {
                return `${displayHours}:${displayMinutes}:${displaySeconds} ${ampm}`;
            }
        },
        []
    );

    return <div>{formatTime(currentTime, format)}</div>;
};

export default TimeDisplay;
