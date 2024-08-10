import { useState } from "react";
import axios from "axios";

export function useMFS100() {
    const [error, setError] = useState(null);

    const getMFS100Info = async () => {
        try {
            const response = await axios.get("http://localhost:8004/mfs100/info");
            return response.data;
        } catch (err) {
            setError(err);
            return { httpStatus: false, err: err.message };
        }
    };

    const captureFinger = async (quality, timeout, noOfFingers) => {
        try {
            const response = await axios.post("http://localhost:8004/mfs100/capturewithdeduplicate", JSON.stringify({
                Quality: quality,
                TimeOut: timeout,
                NoOfFinger: noOfFingers,
            }), {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (err) {
            setError(err);
            return { httpStatus: false, err: err.message };
        }
    };

    return { getMFS100Info, captureFinger, error };
}