import FormTemplate from "@components/FormTemplate";

export default function CreateUser() {
  return (
    <>
      <h1>Hello</h1>
      <FormTemplate
        attributes={{
          "First Name": "text",
          "Last Name": "text",
          Email: "text",
          Password: "text",
          "Confirm Password": "text",
        }}
        forwardUrl="http://localhost:8080/"
      />
    </>
  );
}

/**
 * @description Object representing the route for
 * creating a new user.
 *
 * @type {import('react-router-dom').RouteObject}
 */
export const UserCreationRoute = {
  path: "/create/user",
  element: <CreateUser />,
};
