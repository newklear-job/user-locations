import { DateTime } from 'luxon'
import {BaseModel, column, scope} from '@ioc:Adonis/Lucid/Orm'

export default class UserLocation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public coordinates: object

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static recentLocations = scope((query) => {
    query.orderBy('created_at', 'asc')
  })
}
