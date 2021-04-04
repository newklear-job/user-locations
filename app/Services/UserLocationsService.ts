import UserLocation from 'App/Models/UserLocation'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'

export async function getUserWithinRadius({longitude, latitude, radius, startDate, endDate, unit}) {
  const radiusInKm = getRadiusInKilometers(radius, unit)

  const queryResult = await Database.rawQuery(`SELECT user_id from
    (SELECT * ,(ST_Distance_Sphere(ST_GeomFromText('POINT(${latitude} ${longitude})'), coordinates, 6373))
    AS distance FROM user_locations ORDER BY distance) x
    WHERE x.distance <= ${radiusInKm} and created_at >= '${startDate}' and created_at <= '${endDate}' group by user_id;`
  )
  const userIds = queryResult[0].map((row) => row.user_id)

  return User.query().whereIn('id', userIds).preload('recentLocation');
}

export async function createUserLocation({longitude, latitude, user_id}) {
  const {insertId: userId} = (await Database.rawQuery(`insert into user_locations (coordinates, user_id, created_at)
    values (point(${latitude}, ${longitude}), ${user_id}, now() )`))[0]
  return UserLocation.findOrFail(userId)
}

function getRadiusInKilometers(radius: number, unit: string) {
  switch (unit) {
    case 'm':
      return radius / 1000
    case 'km':
      return radius
    case 'mi':
      return radius * 1.60934
  }
  throw new Error('unsupported unit type')
}
