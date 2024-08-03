import Container from '@components/atoms/container/Container';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
  UseFormWatch,
} from 'react-hook-form';
import { defaultBorderColor, textColors } from '@styles/colors';
import { Checkbox, Input, Text } from '@chakra-ui/react';
import { FormErrorMessages } from '@constants/ErrorMessage';
import { OrderFormData } from '@/types';
import { MIN_USABLE_POINT } from '@/constants';

interface ProductPointFormProps {
  point: number;
  control: Control<OrderFormData>;
  clearErrors: UseFormClearErrors<OrderFormData>;
  watch: UseFormWatch<OrderFormData>;
  errors: FieldErrors<OrderFormData>;
}

function ProductPointForm({
  point, control, clearErrors, watch, errors,
}: ProductPointFormProps) {
  const isUsePointChecked = watch('usePoint');

  return (
    <Container elementSize="full-width" padding="16px" flexDirection="column">
      <Controller
        render={({ field }) => (
          <Checkbox
            borderColor={defaultBorderColor}
            {...field}
            defaultChecked={field.value}
            value=""
            onChange={(e) => {
              if (!e.target.checked) {
                clearErrors('pointAmount');
              }

              field.onChange(e);
            }}
          >
            포인트 사용 (사용 가능:
            {point}
            p)
          </Checkbox>
        )}
        name="usePoint"
        control={control}
      />

      <Controller
        name="pointAmount"
        control={control}
        rules={{
          validate: (value: number | string) => {
            if (isUsePointChecked && !value) return FormErrorMessages.POINT_REQUIRED;

            if (typeof value === 'string') {
              // eslint-disable-next-line no-param-reassign
              value = parseInt(value, 10);
            }

            if (value < MIN_USABLE_POINT) {
              return FormErrorMessages.POINT_LESS_THAN_MIN;
            }

            if (value > point) {
              return FormErrorMessages.POINT_MORE_THAN_AVAILABLE;
            }

            if (value < 0) {
              return FormErrorMessages.POINT_VALUE_ERROR;
            }

            return true;
          },
        }}
        disabled={!isUsePointChecked}
        render={({ field }) => (
          <Input
            type="number"
            borderColor={defaultBorderColor}
            marginTop="5px"
            max={point}
            {...field}
          />
        )}
      />
      {
        errors.pointAmount ? (
          <Text color={textColors.error}>{errors.pointAmount.message}</Text>
        ) : null
      }

    </Container>
  );
}

export default ProductPointForm;
