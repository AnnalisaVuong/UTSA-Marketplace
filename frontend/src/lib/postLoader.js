const BACKEND_URL = "http://localhost:5000";

/**
 * async ({params}) => {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${params.token}`)
    return fetch(BACKEND_URL + "/listing/retrieve/self", {
      headers,
      method: "GET"
    });
  },
 * @param {*} postId 
 * @param {*} headers 
 * @returns 
 */
const retrievePostQuery = (postId, headers) => ({
  queryKey: ["posts", postId],
  queryFn: async () => {
    fetch(BACKEND_URL + `/listing/retrieve/${postId}`, {
      headers: headers,
      method: "GET",
    });
  },
});

/**
 *
 * @param {import("@tanstack/react-query").QueryClient} queryClient
 *
 * @returns {unknown}
 */
const loadPosts =
  (queryClient) =>
  async ({ params }) => {
    const query = retrievePostQuery(, params.token);
  };
