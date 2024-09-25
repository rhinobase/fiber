import type { FieldProps } from "@duck-form/fields";
import { DevTool } from "@hookform/devtools";
import { DuckField, useField } from "duck-form";
import {
  type FieldValues,
  type SubmitErrorHandler,
  type SubmitHandler,
  useFormContext,
} from "react-hook-form";

export type Canvas = {
  onSubmit?: SubmitHandler<FieldValues>;
  onError?: SubmitErrorHandler<FieldValues>;
} & {
  fields?: Record<string, FieldProps>;
};

export function Canvas() {
  // Getting component config
  const config = useField<Canvas>();
  const { fields, onSubmit, onError } = config;

  // Adding provider for forms
  const { handleSubmit, control } = useFormContext();

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit ?? console.log, onError)}
        className="space-y-3"
        autoComplete="off"
      >
        {fields &&
          Object.entries(fields).map(([id, field]) => (
            <DuckField key={id} id={id} {...field} />
          ))}
      </form>
      <DevTool control={control} />
    </>
  );
}
