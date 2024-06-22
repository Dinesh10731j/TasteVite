import { useQuery } from "react-query";
import { axiosInstance } from "../api/BaseUrl";
import { toast } from "react-toastify";
import {useForm} from "react-hook-form"

interface ResponseData {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const searchRecipe = async (): Promise<ResponseData[]> => {
  try {
    const response = await axiosInstance.get("?s=pizza");
    console.log('API Response:', response.data);

    if (response.data && Array.isArray(response.data.meals)) {
      return response.data.meals;
    } else {
      console.error('API response structure:', response.data);
      throw new Error('API response does not contain meals array');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error so useQuery can handle it
  }
}

const Searchbar = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getRecipes"],
    queryFn: searchRecipe,
    onSuccess: () => {
      toast.success('Data fetched successfully');
    },
    onError: () => {
      toast.error('Failed to fetch data');
    }
  });

  if (isLoading) {
    return <div className="text-2xl font-medium">Loading.....</div>;
  }

  if (error) {
    return <h1>Error while fetching Recipe</h1>;
  }

  return (
    <div className="">
        <form>

        <input placeholder="Search for a recipe" />
      <div>
        {Array.isArray(data) && data?.map((recipe) => (
          <div key={recipe?.idMeal}>
            <div>{recipe?.strMeal}</div>
            <img src={recipe?.strMealThumb} alt={recipe.strMeal} />
            <p>I am Rece</p>
          </div>
        ))}
      </div>

        </form>
     
    </div>
  );
}

export default Searchbar;
