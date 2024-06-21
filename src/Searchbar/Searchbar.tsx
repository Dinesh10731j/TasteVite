
import { useQuery } from "react-query";
import axios from "axios";
import { BaseUrl } from "../api/BaseUrl";

const SearchReceipe = async (): Promise<{ idMeal: string, strMeal: string }[]> => {
    const response = await axios.get(BaseUrl);
    console.log('API Response:', response.data);

    if (response.data && Array.isArray(response.data.meals)) {
        return response.data.meals;
    } else {
        throw new Error('API response does not contain meals array');
    }
}

const Searchbar = () => {
    const { data = [], isLoading, error } = useQuery("receipe", SearchReceipe, {
        onSuccess: (data) => {
            console.log("Data Fetched Successfully", data);
        },
        onError: (error) => {
            console.log("Error fetching data", error);
        }
    });

    if (isLoading) {
        return <div className="text-2xl font-medium">Loading.....</div>;
    }

    if (error) {
        return <h1>Error while fetching Receipe</h1>;
    }

    return (
        <div className="">
            <input placeholder="Search for a recipe" />
            <div>
                {Array.isArray(data) && data.map((recipe: { idMeal: string, strMeal: string }) => (
                    <div key={recipe.idMeal}>{recipe.strMeal}</div>
                ))}
            </div>
        </div>
    );
}

export default Searchbar;
