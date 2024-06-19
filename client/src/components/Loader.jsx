import { Spinner } from "flowbite-react";

const Loader = () => {
  return (
    <div className="flex mx-auto my-auto justify-center items-center h-screen w-screen">
      <Spinner
        aria-label="Loading"
        style={{
          width: "100px",
          height: "100px",
          margin: "auto",
          display: "block",
        }}
      />
    </div>
  );
};

export default Loader;
