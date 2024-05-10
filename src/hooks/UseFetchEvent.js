import useFetch from "./useFetch";

export function UseFetchEvent({ url, options }) {
  //useFetch부르고
  // const handleEvent = async () => {
  //   try {
  //     const response = await fetch(url, options);
  //     const responseData = await response.json();
  //     return responseData;
  //   } catch (error) {
  //     console.error("Error logging out:", error);
  //   }
  // };
  console.log("click");
  const { data, error, loading } = useFetch(url, options);

  if (!data || loading || error) {
    return null;
  }

  if (error) {
    console.log(error);
  }

  return { data, error, loading };
}
