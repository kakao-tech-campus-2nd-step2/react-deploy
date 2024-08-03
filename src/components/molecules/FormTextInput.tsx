import {
  FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister,
} from 'react-hook-form';
import {
  FormControl, FormLabel, Input, Text,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { generateRandomId } from '@/utils';

interface FormTextInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldKey: Path<T>;
  options: RegisterOptions<T>;
  placeholder?: string;
  fieldLabel: string;
}

function FormTextInput<T extends FieldValues>({
  register, errors, fieldKey, options, placeholder, fieldLabel,
}: FormTextInputProps<T>) {
  const id = useRef(generateRandomId());
  const domId = `${id.current}-${fieldKey}`;

  return (
    <FormControl isInvalid={!!errors.name} mb="4">
      <FormLabel htmlFor={domId}>
        {fieldLabel}
      </FormLabel>
      <Input
        id={domId}
        placeholder={placeholder}
        {...register(fieldKey, options)}
      />
      {errors.name && <Text color="red.500" fontSize="sm">{errors[fieldKey]?.message as string}</Text>}
    </FormControl>
  );
}

export default FormTextInput;
