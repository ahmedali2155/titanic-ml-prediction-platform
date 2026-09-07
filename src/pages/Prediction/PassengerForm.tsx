import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Loader2,
  Sparkles,
  FlaskConical,
} from "lucide-react";

import {
  passengerSchema,
  type PassengerFormValues,
} from "@/utils/schemas";

import { FormField } from "@/components/forms/FormField";
import { SelectInput } from "@/components/forms/SelectInput";
import { TextInput } from "@/components/forms/TextInput";

interface PassengerFormProps {
  onSubmit: (values: PassengerFormValues, useDemo: boolean) => void;
  isSubmitting: boolean;
}

const DEFAULT_VALUES: PassengerFormValues = {
  pclass: 1,
  sex: "female",
  age: 29,
  sibsp: 0,
  parch: 0,
  fare: 78.5,
  embarked: "S",
};

export function PassengerForm({
  onSubmit,
  isSubmitting,
}: PassengerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PassengerFormValues>({
    resolver: zodResolver(passengerSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const submit = (useDemo: boolean) =>
    handleSubmit((values) => onSubmit(values, useDemo));

  return (
    <form
      className="relative flex flex-col gap-5"
      onSubmit={submit(false)}
    >
      {/* Loading overlay */}
      {isSubmitting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-slate-950/55 backdrop-blur-[3px]"
        >
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-700/60 bg-slate-900/90 px-6 py-5 shadow-2xl">
            <Loader2 className="h-8 w-8 animate-spin text-signal-400" />
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-100">
                Processing prediction
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Waiting for the ML API response…
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div
        className={
          isSubmitting
            ? "pointer-events-none select-none opacity-60"
            : ""
        }
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            label="Passenger class"
            htmlFor="pclass"
            error={errors.pclass?.message}
          >
            <SelectInput
              id="pclass"
              hasError={!!errors.pclass}
              {...register("pclass")}
            >
              <option value={1}>1st class</option>
              <option value={2}>2nd class</option>
              <option value={3}>3rd class</option>
            </SelectInput>
          </FormField>

          <FormField
            label="Sex"
            htmlFor="sex"
            error={errors.sex?.message}
          >
            <SelectInput
              id="sex"
              hasError={!!errors.sex}
              {...register("sex")}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </SelectInput>
          </FormField>

          <FormField
            label="Age"
            htmlFor="age"
            error={errors.age?.message}
          >
            <TextInput
              id="age"
              type="number"
              step="1"
              suffix="yrs"
              hasError={!!errors.age}
              {...register("age")}
            />
          </FormField>

          <FormField
            label="Fare"
            htmlFor="fare"
            error={errors.fare?.message}
          >
            <TextInput
              id="fare"
              type="number"
              step="0.01"
              suffix="USD"
              hasError={!!errors.fare}
              {...register("fare")}
            />
          </FormField>

          <FormField
            label="Siblings / spouses aboard"
            htmlFor="sibsp"
            error={errors.sibsp?.message}
          >
            <TextInput
              id="sibsp"
              type="number"
              step="1"
              hasError={!!errors.sibsp}
              {...register("sibsp")}
            />
          </FormField>

          <FormField
            label="Parents / children aboard"
            htmlFor="parch"
            error={errors.parch?.message}
          >
            <TextInput
              id="parch"
              type="number"
              step="1"
              hasError={!!errors.parch}
              {...register("parch")}
            />
          </FormField>

          <FormField
            label="Port of embarkation"
            htmlFor="embarked"
            error={errors.embarked?.message}
            className="sm:col-span-2"
          >
            <SelectInput
              id="embarked"
              hasError={!!errors.embarked}
              {...register("embarked")}
            >
              <option value="S">Southampton (S)</option>
              <option value="C">Cherbourg (C)</option>
              <option value="Q">Queenstown (Q)</option>
            </SelectInput>
          </FormField>
        </div>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}

            {isSubmitting
              ? "Scoring passenger…"
              : "Run prediction"}
          </motion.button>

          <motion.button
            type="button"
            disabled={isSubmitting}
            onClick={submit(true)}
            whileTap={{ scale: 0.98 }}
            className="btn-glass flex-1 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FlaskConical className="h-4 w-4" />
            )}

            {isSubmitting
              ? "Processing…"
              : "Run demo prediction"}
          </motion.button>
        </div>
      </div>
    </form>
  );
}