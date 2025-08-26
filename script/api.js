function fetchData() {
    async function fetchDataCategories() {
        try {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };
            const response = await fetch(
                "https://www.themealdb.com/api/json/v1/1/categories.php",
                requestOptions);

            if (!response.ok) {
                throw new Error(`something went wrong ${response.status}`);
            }

            const json = await response.json();
            // const json = await response.t
            const data = json;
            console.log("data Categories return --", data);
            return data;
        } catch (error) {
            throw new console.error("Error:", err.response?.data || err.message);
        }

    }

    async function fetchDataSearch(item) {
        try {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };
            const response = await fetch(
                `ttps://www.themealdb.com/api/json/v1/1/search.php?f=${item}`,
                requestOptions);

            if (!response.ok) {
                throw new Error(`something went wrong ${response.status}`);
            }

            const json = await response.json();
            // const json = await response.t
            const data = json;

            console.log("dataSearch return --", data);
            return data;
        } catch (error) {
            throw new console.error("Error:", err.response?.data || err.message);
        }

    }
}


export default fetchData();