import { useMemo } from "react";

const TodayDay = () => {
    const today = useMemo(() => {
        return new Date();
    }, []);

    const daysOfWeek = useMemo(() => {
        return [
            "Chủ nhật",
            "Thứ hai",
            "Thứ ba",
            "Thứ tư",
            "Thứ năm",
            "Thứ sáu",
            "Thứ bảy",
        ];
    }, []);

    const dayOfWeek = useMemo(() => {
        return today.getDay();
    }, [today]);

    return <p>{daysOfWeek[dayOfWeek]}</p>;
};

export default TodayDay;
