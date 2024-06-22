import axios from "axios"
export const BaseUrl = "https://www.themealdb.com/api/json/v1/1/search.php";

export const axiosInstance = axios.create({
    baseURL:BaseUrl
})