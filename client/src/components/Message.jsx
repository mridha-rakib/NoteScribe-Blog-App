import { Alert } from "flowbite-react";

const Message = ({ variant, children }) => {
  return <Alert color={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
