import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import StoreUserLocationValidator from "App/Validators/UserLocations/StoreUserLocationValidator";
import IndexUserLocationValidator from "App/Validators/UserLocations/IndexUserLocationValidator";
import {createUserLocation, getUserWithinRadius} from "App/Services/UserLocationsService";

export default class UserLocationsController {
  public async index({request, response}: HttpContextContract) {
    const validated = await request.validate(IndexUserLocationValidator)

    const users = await getUserWithinRadius(validated)

    return response.ok(users)
  }

  public async store({request, response}: HttpContextContract) {
    const validated = await request.validate(StoreUserLocationValidator)
    const user = await createUserLocation(validated)
    return response.created(user)
  }
}
