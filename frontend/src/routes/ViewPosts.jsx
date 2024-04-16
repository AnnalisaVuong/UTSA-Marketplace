import {useLoaderData} from "react-router-dom";

export function ViewPosts() {
  const posts = useLoaderData();

  return (
    <div>
      <h1>View User Posts.</h1>
      {
        posts
      }
    </div>
  );
}