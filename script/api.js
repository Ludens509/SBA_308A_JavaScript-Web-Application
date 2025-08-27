export async function fetchDataCategories() {
   try {

      var requestOptions = {
         method: "GET",
         redirect: "follow",
      };
      const response = await fetch(
         "https://www.themealdb.com/api/json/v1/1/categories.php",
         requestOptions);

      if (!response.ok) {
         throw new Error(`something went wrong ${response.status}`);
      }

      const json = await response.json();

      console.log("data Categories return --", json.categories);
      return json.categories;
   } catch (error) {
      throw new console.error("Error:", err.response?.data || err.message);
   }

}

export async function fetchDataSearch(item) {
   try {
      const requestOptions = {
         method: "GET",
         redirect: "follow",
      };
      const response = await fetch(
         `https://www.themealdb.com/api/json/v1/1/search.php?f=${item}`,
         requestOptions);

      if (!response.ok) {
         throw new Error(`something went wrong ${response.status}`);
      }

      const json = await response.json();
      console.log("dataSearch return --", json.meals);
      return json.meals;
   } catch (error) {
      throw new console.error("Error:", err.response?.data || err.message);
   }

}

export async function fetchMealsByCategory(category) {
    try {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        const response = await fetch(
            `www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
            requestOptions
        );

        if (!response.ok) {
            throw new Error(`Something went wrong ${response.status}`);
        }

        const json = await response.json();
        console.log("meals by category return --", json.meals);
        return json.meals;
    } catch (error) {
        console.error("Error fetching meals by category:", error.message);
        throw error;
    }
}