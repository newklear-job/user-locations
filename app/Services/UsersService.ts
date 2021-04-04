import User from 'App/Models/User'

export async function getUsers(currentPage: number, perPage: number) {
  return User.query()
    .preload('recentLocation')
    .paginate(currentPage, perPage)
}

export async function createUser(userData: object) {
  return User.create(userData)
}

export async function getUser(id) {
  return User.findOrFail(id)
}

export async function updateUser(user: User, userData: object) {
  user.merge(userData)
  return user.save()
}

export async function deleteUser(id: number) {
  const user = await User.findOrFail(id)
  return user.delete()
}
