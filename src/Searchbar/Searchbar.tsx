import { useQuery } from "react-query";
import { axiosInstance } from "../api/BaseUrl";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {ThreeDots} from "react-loader-spinner";

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

      if (response.data && Array.isArray(response.data.meals)) {
        return response.data.meals;
      } else {
        throw new Error("API response does not contain meals array");
      }
    } catch (error) {
      throw error; // Rethrow the error so useQuery can handle it
    }
  };

  const [receipename, setReceipename] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Types>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getRecipes"],
    queryFn: searchRecipe,
  });

  const onSubmit = (data: Types) => {
    setReceipename(data.Receipename);
  };

  if (isLoading) {
    return (
      <div className="text-2xl font-medium a flex flex-col justify-center items-center mt-12">
        <ThreeDots color="#7f8c8d" />
      </div>
    );
  }

  if (error) {
    return <h1>Error while fetching Recipe</h1>;
  }

  return (
    <div className="p-12 py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
        <input
          type="text"
          placeholder="Search for a recipe"
          className="px-6 py-2  border border-cyan-400 rounded-md shadow-lg md:[px-12 py-2]"
          {...register("Receipename", { required: true })}
        />
        {errors.Receipename && (
          <p className="text-red-500">This field is required</p>
        )}

        <div className="px-12 py-5">
          {Array.isArray(data) &&
            data?.map((recipe) => (
<div key={recipe?.idMeal} className="flex flex-col justify-center items-center gap-10" >
                <div className="font-serif font-medium text-2xl">{recipe?.strMeal}</div>
                <img
                  src={recipe?.strMealThumb}
                  alt={recipe?.strMeal}
                  className="h-[220px] w-[220px] md:h-[300px] md:w-[300px] rounded-md shadow-md"
                />
                
                <p>Ingredients</p>
                <p>{recipe?.strInstructions}</p>
              </div>

        
              
            ))}
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
