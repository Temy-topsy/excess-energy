"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

/**
 * A presentational, accessible field system. Field creates the id wiring;
 * FieldControl injects id, aria-describedby, and aria-invalid onto whatever
 * control it wraps (Input, Textarea, SelectTrigger). This stays independent of
 * any form library so the Phase 4 react-hook-form can compose it directly.
 */

interface FieldContextValue {
  id: string;
  descriptionId: string;
  errorId: string;
  invalid: boolean;
}

const FieldContext = React.createContext<FieldContextValue | null>(null);

function useFieldContext() {
  const ctx = React.useContext(FieldContext);
  if (!ctx) {
    throw new Error("Field subcomponents must be used within <Field>.");
  }
  return ctx;
}

interface FieldProps extends React.ComponentProps<"div"> {
  /** Marks the field invalid, switching label and control to error styling. */
  invalid?: boolean;
  /** Optional stable id; one is generated when omitted. */
  fieldId?: string;
}

function Field({
  className,
  invalid = false,
  fieldId,
  ...props
}: FieldProps) {
  const generatedId = React.useId();
  const id = fieldId ?? generatedId;
  const value = React.useMemo<FieldContextValue>(
    () => ({
      id,
      descriptionId: `${id}-description`,
      errorId: `${id}-error`,
      invalid,
    }),
    [id, invalid],
  );

  return (
    <FieldContext.Provider value={value}>
      <div
        data-slot="field"
        data-invalid={invalid || undefined}
        className={cn("group flex flex-col gap-2", className)}
        {...props}
      />
    </FieldContext.Provider>
  );
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { id } = useFieldContext();
  return <Label htmlFor={id} className={className} {...props} />;
}

/**
 * Injects the wiring onto its single child control. The control keeps its own
 * props; anything passed explicitly on the child wins.
 */
function FieldControl(props: React.ComponentProps<typeof Slot.Root>) {
  const { id, descriptionId, errorId, invalid } = useFieldContext();
  return (
    <Slot.Root
      id={id}
      aria-describedby={cn(descriptionId, invalid && errorId) || undefined}
      aria-invalid={invalid || undefined}
      data-slot="field-control"
      {...props}
    />
  );
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  const { descriptionId } = useFieldContext();
  return (
    <p
      id={descriptionId}
      data-slot="field-description"
      className={cn("text-body-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

/**
 * Error message. Renders nothing when there is no message, so it can stay
 * mounted in the form. Uses role=alert so it is announced when it appears.
 */
function FieldError({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { errorId } = useFieldContext();
  if (!children) return null;
  return (
    <p
      id={errorId}
      role="alert"
      data-slot="field-error"
      className={cn("text-body-sm font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export {
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
  useFieldContext,
};
