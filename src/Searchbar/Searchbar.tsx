import { useQuery } from "react-query";
import { axiosInstance } from "../api/BaseUrl";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface ResponseData {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

interface Types {
  Receipename: string;
}



const Searchbar = () => {

    const searchRecipe = async (): Promise<ResponseData[]> => {
        try {
          const response = await axiosInstance.get(`?s=${receipename}`);
    
      toast.success("Meal Load Successfully")
          if (response.data && Array.isArray(response.data.meals)) {
            return response.data.meals;
          } else {
            throw new Error('API response does not contain meals array');
            toast.error
          }
        } catch (error) {

          throw error; // Rethrow the error so useQuery can handle it
        }
      }
    


const[receipename,setReceipename] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<Types>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getRecipes"],
    queryFn: searchRecipe,
  });

  const onSubmit = (data: Types) => {

    setReceipename(data.Receipename)
  }


  

  if (isLoading) {
    return <div className="text-2xl font-medium animate-bounce">Loading.....</div>;
  }

  if (error) {
    return <h1>Error while fetching Recipe</h1>;
  }

  return (
    <div className=" bg-red-200">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Search for a recipe" {...register("Receipename", { required: true })} />
        {errors.Receipename && <p className="text-red-500">This field is required</p>}
        
        <div>
          {Array.isArray(data) && data?.map((recipe) => (
            <div key={recipe?.idMeal}>
              <div>{recipe?.strMeal}</div>
              <img src={recipe?.strMealThumb} alt={recipe?.strMeal} className="h-20 w-20 md:w-10" />
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
