import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import util from 'util'

const ObjectId = mongodb.ObjectId

// https://stackoverflow.com/questions/40879424/unable-to-read-collection-data-in-mongo-node
//Grabbing readable data


dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000
//try to connect to the port if not connect to port 8000

MongoClient.connect(
  process.env.RESTREVIEWS_DB_URI,
  {
    maxPoolSize: 500,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  }
)
.catch(err => {
  console.error(err.stack)
  process.exit(1)
})
.then(async client => {
  // await RestaurantsDAO.injectDB(client)
  // await ReviewsDAO.injectDB(client)
  let collection = await client.db(process.env.RESTREVIEWS_NS).collection('restaurants')
  let test = await collection.distinct('cuisine')
  let cursor = await collection.find({'address.zipcode': '11203'}).limit(20).skip(3).toArray()
  const totalNum = await collection.countDocuments({'address.zipcode': '11203'})
  app.listen(port, () => {
    console.log(`listening on port ${port}`)

    console.log(util.inspect(cursor, false, null), totalNum, test)
    return collection
  })
})
