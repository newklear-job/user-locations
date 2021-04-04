import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule(
  'in',
  (value, [{ acceptableValues }], { pointer, arrayExpressionPointer, errorReporter, mutate }) => {
    if (typeof value !== 'string') {
      return
    }

    if (!acceptableValues.includes(value)) {
      errorReporter.report(
        pointer,
        'in',
        `Field is not in acceptable values: ${acceptableValues.toString()}`,
        arrayExpressionPointer
      )
      return
    }

    mutate(value)
  }
)
