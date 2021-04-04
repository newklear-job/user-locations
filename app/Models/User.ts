import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import UserLocation from 'App/Models/UserLocation'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => UserLocation)
  public locations: HasMany<typeof UserLocation>

  @hasOne(() => UserLocation, {
    onQuery: (query) => query.apply((scopes) => scopes.recentLocations())
  })
  public recentLocation: HasOne<typeof UserLocation>
}
