import { useEffect, useMemo, useState, ChangeEvent } from "react";

type FormValidations<T> = {
  [K in keyof T]?: [(value: T[K]) => boolean, string];
};

type FormState<T> = {
  [K in keyof T]: T[K];
};

type ValidationResult = {
  [key: string]: string | null;
};

export const useForm = <T extends Record<string, any>>(
  initialForm: T,
  formValidations: FormValidations<T> = {}
) => {
  const [formState, setFormState] = useState<FormState<T>>(initialForm);
  const [formValidation, setFormValidation] = useState<ValidationResult>({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues: ValidationResult = {};

    (Object.keys(formValidations) as Array<keyof T>).forEach((formField) => {
      const [fn, errorMessage] = formValidations[formField]!;
      formCheckedValues[`${String(formField)}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    });

    setFormValidation(formCheckedValues);
  };

  // Agregar displayNameValid, emailValid, passwordValid al objeto de retorno
  const { displayName, email, password } = formState;
  const displayNameValid = formValidation["displayNameValid"] ?? null;
  const emailValid = formValidation["emailValid"] ?? null;
  const passwordValid = formValidation["passwordValid"] ?? null;

  return {
    displayName,
    email,
    password,
    onInputChange,
    onResetForm,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  };
};
