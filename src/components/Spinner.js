import { ThreeDots } from "react-loader-spinner";

const Spinner = () => {
  return (
    <ThreeDots
      visible={true}
      height="200"
      width="80"
      color="#2a486b"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Spinner;
