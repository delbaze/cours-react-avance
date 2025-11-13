import React, { useState, useEffect, type FormEvent } from "react";

type Values = Record<string, string>;
type Errors = Record<string, string>;
type Touched = Record<string, boolean>;

type FormRenderProps = {
  values: Values;
  errors: Errors;
  touched: Touched;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  reset: () => void;
};

type FormProps = {
  initialValues: Values;
  validate?: (valudes: Values) => Errors | Promise<Errors>;
  onSubmit: (values: Values) => Promise<void>;
  children: (props: FormRenderProps) => React.ReactNode;
};

function Form({ initialValues, validate, onSubmit, children }: FormProps) {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  useEffect(() => {
    if (!validate) return;
    const runValidation = async () => {
      const result = await validate(values);
      setErrors(result);
    };
    runValidation();
  }, [values, validate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setIsDirty(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(values);
      setIsDirty(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsDirty(false);
  };

  const isValid =
    Object.keys(errors).length === 0 && Object.keys(touched).length > 0;

  return (
    <>
      {children({
        values,
        errors,
        touched,
        isValid,
        isSubmitting,
        isDirty,
        handleChange,
        handleSubmit,
        reset,
      })}
    </>
  );
}

export default Form;
