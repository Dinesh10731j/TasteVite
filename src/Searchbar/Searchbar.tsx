import { useQuery } from "react-query";
import { axiosInstance } from "../api/BaseUrl";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

interface ResponseData {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

interface Types {
  Receipename: string;
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
  const { register, handleSubmit, formState: { errors } } = useForm<Types>();

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

  const onSubmit = (data: Types) => {
    console.log(data);
  }

  if (isLoading) {
    return <div className="text-2xl font-medium animate-bounce">Loading.....</div>;
  }

  if (error) {
    return <h1>Error while fetching Recipe</h1>;
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Search for a recipe" {...register("Receipename", { required: true })} />
        {errors.Receipename && <p className="text-red-500">This field is required</p>}
        
        <div>
          {Array.isArray(data) && data?.map((recipe) => (
            <div key={recipe?.idMeal}>
              <div>{recipe?.strMeal}</div>
              <img src={recipe?.strMealThumb} alt={recipe?.strMeal} />
              <p>Ingredients</p>
              <p>{recipe?.strInstructions}</p>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default Searchbar;
