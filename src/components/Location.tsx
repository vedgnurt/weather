import { useState, useEffect } from "react";
import axios from "axios";
import { twMerge } from "tailwind-merge";

const Location = () => {
    const [location, setLocation] = useState("");

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    axios
                        .get("https://nominatim.openstreetmap.org/reverse", {
                            params: {
                                lat: latitude,
                                lon: longitude,
                                format: "json",
                                addressdetails: 1,
                            },
                        })
                        .then((response) => {
                            if (response.status === 200) {
                                const formattedAddress =
                                    response.data.address.city;
                                setLocation(formattedAddress);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }, []);

    return <p className={twMerge("text-lg font-medium")}>{location}</p>;
};

export default Location;
