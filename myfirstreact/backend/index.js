import express from 'express'
import cors from 'cors' //cross origin resource sharing
import logger from 'morgan' //logger
import dotenv from 'dotenv'//load environment variables
import mongodb from 'mongodb'
import util from 'util'
import RestaurantsDAO from './dao/restaurantsDAO.js'
import app from './server.js'

dotenv.config() //load env
const port = process.env.PORT || 8000
const MongoClient = mongodb.MongoClient

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

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
  await RestaurantsDAO.injectDB(client)
  // await ReviewsDAO.injectDB(client)
  // let collection = await client.db(process.env.RESTREVIEWS_NS).collection('restaurants')
  // let test = await collection.distinct('cuisine')
  // let cursor = await collection.find({'address.zipcode': '11203'}).limit(20).skip(3).toArray()
  // const totalNum = await collection.countDocuments({'address.zipcode': '11203'})
  app.listen(port, () => { //open express server
    console.log('Successfully connected to the database')
    console.log(`listening on port ${port}`)

    // console.log(util.inspect(cursor, false, null), totalNum, test)
  
  })
  
})