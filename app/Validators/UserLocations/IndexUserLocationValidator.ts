import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    latitude: schema.number([rules.range(-90, 90)]),
    longitude: schema.number([rules.range(-180, 180)]),
    radius: schema.number([]),
    unit: schema.string({}, [rules.in({ acceptableValues: ['m', 'km', 'mi'] })]),
    startDate: schema.date({}, []),
    endDate: schema.date({}, []),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {}
}
