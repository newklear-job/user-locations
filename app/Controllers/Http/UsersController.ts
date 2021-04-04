import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import StoreUserValidator from 'App/Validators/Users/StoreUserValidator'
import UpdateUserValidator from 'App/Validators/Users/UpdateUserValidator'
import {getUsers, createUser, getUser, updateUser, deleteUser} from "App/Services/UsersService";

export default class UsersController {
  public async index({request, response}: HttpContextContract) {
    const currentPage = request.input('current_page', 1)
    const perPage = request.input('per_page', 10)

    const users = await getUsers(currentPage, perPage)

    return response.ok(users)
  }

  public async store({request, response}: HttpContextContract) {
    const validated = await request.validate(StoreUserValidator)
    const user = await createUser(validated)
    return response.created(user)
  }

  public async show({params, response}: HttpContextContract) {
    const user = await getUser(params.id)
    return response.ok(user)
  }

  public async update({params, request, response}: HttpContextContract) {
    const userPromise = getUser(params.id)
    const validatePromise = request.validate(UpdateUserValidator)
    const [validated, user] = await Promise.all([validatePromise, userPromise])

    const updatedUser = await updateUser(user, validated)

    return response.ok(updatedUser)
  }

  public async destroy({params, response}: HttpContextContract) {
    await deleteUser(params.id)
    return response.ok('')
  }
}
