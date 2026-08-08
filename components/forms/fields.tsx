"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { availableServices } from "@/lib/content/services";

/**
 * Form fields shared by every lead form. Each composes the accessible Field
 * primitives (label, control wiring, announced error) with react-hook-form via
 * context, so a form only lists the fields it needs and the label, validation
 * message, and aria wiring come for free. Reused across the contact and quote
 * forms so a field such as phone looks and behaves the same in both.
 *
 * These read the form through useFormContext, so each form must be wrapped in a
 * FormProvider.
 */

/** Reads a flat field error message by name from the form state. */
function useFieldError(name: string): string | undefined {
  const {
    formState: { errors },
  } = useFormContext();
  const message = errors[name]?.message;
  return typeof message === "string" ? message : undefined;
}

interface TextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: string;
  inputMode?: React.ComponentProps<typeof Input>["inputMode"];
  description?: string;
}

function TextField({
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
  inputMode,
  description,
}: TextFieldProps) {
  const { register } = useFormContext();
  const error = useFieldError(name);

  return (
    <Field invalid={Boolean(error)}>
      <FieldLabel>{label}</FieldLabel>
      <FieldControl>
        <Input
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          {...register(name)}
        />
      </FieldControl>
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      <FieldError>{error}</FieldError>
    </Field>
  );
}

interface TextareaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  description?: string;
}

function TextareaField({
  name,
  label,
  placeholder,
  rows,
  description,
}: TextareaFieldProps) {
  const { register } = useFormContext();
  const error = useFieldError(name);

  return (
    <Field invalid={Boolean(error)}>
      <FieldLabel>{label}</FieldLabel>
      <FieldControl>
        <Textarea rows={rows} placeholder={placeholder} {...register(name)} />
      </FieldControl>
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      <FieldError>{error}</FieldError>
    </Field>
  );
}

/**
 * The service picker, drawn from the live services so a new service appears here
 * automatically. Controlled through react-hook-form's Controller because the
 * Radix Select manages its own value.
 */
function ServiceSelectField({
  name = "service",
  label = "Service needed",
}: {
  name?: string;
  label?: string;
}) {
  const { control } = useFormContext();
  const error = useFieldError(name);

  return (
    <Field invalid={Boolean(error)}>
      <FieldLabel>{label}</FieldLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            value={field.value || undefined}
            onValueChange={field.onChange}
            name={field.name}
          >
            <FieldControl>
              <SelectTrigger onBlur={field.onBlur}>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
            </FieldControl>
            <SelectContent>
              {availableServices.map((service) => (
                <SelectItem key={service.slug} value={service.slug}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <FieldError>{error}</FieldError>
    </Field>
  );
}

/**
 * The honeypot. Hidden from people and assistive tech, present in the DOM for
 * bots that fill every field. The schema rejects any submission where it is not
 * empty. Kept out of the tab order and off screen rather than display:none, so
 * bots that skip hidden inputs still see it.
 */
function HoneypotField({ name = "company" }: { name?: string }) {
  const { register } = useFormContext();
  return (
    <div
      aria-hidden="true"
      className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
    >
      <label htmlFor={`${name}-hp`}>Company</label>
      <input
        id={`${name}-hp`}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register(name)}
      />
    </div>
  );
}

export { TextField, TextareaField, ServiceSelectField, HoneypotField };
