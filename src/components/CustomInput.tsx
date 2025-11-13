import { forwardRef } from "react";

const CustomInput = forwardRef<HTMLInputElement, { placeholder?: string }>(
  (props, ref) => {
    return <input ref={ref} {...props} />;
  }
);


export default CustomInput;