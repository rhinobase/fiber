import { createThread, useThread } from "@fibr/react";
import { InputField } from "@rafty/ui";
import { useFormContext } from "react-hook-form";
import { FieldWrapper, type FieldWrapperProps } from "../FieldWrapper";
import { InputWrapper, type InputWrapperProps } from "../InputWrapper";

export type StringInput = FieldWrapperProps<
  InputWrapperProps<{
    inputType?: string;
    placeholder?: string;
    defaultValue?: string;
  }>
>;

export function StringInput() {
  const {
    id,
    defaultValue,
    placeholder,
    inputType = "text",
  } = useThread<StringInput>();

  const { register } = useFormContext();

  return (
    <FieldWrapper>
      <InputWrapper>
        <InputField
          type={inputType}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(id)}
        />
      </InputWrapper>
    </FieldWrapper>
  );
}

export const string = createThread<StringInput>("string");
