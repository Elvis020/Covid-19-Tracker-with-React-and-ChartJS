import Axios from "axios";

let apiUrl = "https://covid19.mathdro.id/api";
let changeableUrl = apiUrl;

// For Card Component
export const fetchData = async (country) => {
    if (country) {
        changeableUrl = `${apiUrl}/countries/${country}`;
    }
    try {
        // Destructuring in the highest order
        const {
            data: { confirmed, recovered, deaths, lastUpdate },
        } = await Axios.get(changeableUrl);
        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        console.error(error);
    }
};

// For Chart Component
export const fetchDailyData = async () => {
    try {
        const { data } = await Axios.get(`${apiUrl}/daily`);
        const res = data.map((d) => ({
            confirmed: d.confirmed.total,
            deaths: d.deaths.total,
            date: d.reportDate,
        }));
        return res;
    } catch (error) {
        console.error(error);
    }
};

// For the Country Picker
export const countries = async () => {
    try {
        const {
            data: { countries },
        } = await Axios.get(`${apiUrl}/countries`);
        return countries.map((country) => country.name);
    } catch (err) { }
};
