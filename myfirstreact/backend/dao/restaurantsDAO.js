import express from 'express';
import mongodb from 'mongodb'

// FUNCTIONS MADE HERE A CALLED IN THE ../API/CONTROLLER FOLDER
const ObjectId = mongodb.ObjectId
//create an instance of the express router
const router = express.Router()
let restaurants

export default class RestaurantsDAO {
  /**
   * 
   * @param {*} dbconn 
   * @returns Object containing {restaurantsList : , totalNumRestaurants :} as keys
   */
  static async injectDB(dbconn) {
    if (restaurants) {
      return
    }
    try {
      //grab the restaurants collection

      restaurants = dbconn.db(process.env.RESTAURANTS_NS).collection('restaurants')
    }
    catch (e) {
      console.error(
        `Unable to establish a collection handle in restaurantDAO: ${e}`, 
      )
    }
  }

  static async getRestaurants({//gets called by restaurants.controller.js
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      console.log(`Filters that were sent to restaurantsDAO.getRestaurants(): ${filters}`)
      if ('name' in filters) {
        query = {$text: {$search: filters['name']}}
        //$text is just a variable for what the user searched for 
        console.log(`Name queryy ${query}`)
      }
      else if ('cuisine' in filters) {
        query = {'cuisine' : {$eq: filters['cuisine']}}
        console.log(`Cuisine query ${query}`)
      }
      else if ('zipcode' in filters) {
        query = {'address.zipcode' : {$eq: filters['zipcode']}}
        console.log(`Zipcode query ${query}`)
      }
    }
    let cursor

    try {
      cursor = await restaurants.find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ensure query is correct ${e}`)
      
      return {restaurantsLlist: [], totalNumRestaurants: 0}
    }
    console.log('skip value', restaurantsPerPage, page)
    //page with limited amount of objects visible
    const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

    try{
      const restaurantsList = await displayCursor.toArray() //makes object readable
      const totalNumRestaurants = await restaurants.countDocuments(query)
      restaurantsList.sort((a,b) => { //only sorts per the current page
        if(a.name < b.name){
          return -1
        }
        if(a.name > b.name){
          return 1
        }
        return 0
      })

      return {restaurantsList, totalNumRestaurants}
    } catch(e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { restaurantsList: [], totalNumRestaurants: 0}
    }
  }

  static async getRestaurantByID(id) {
    try {
      const pipeline = [
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
        {
          $lookup: {
            from: "reviews",
            let: {id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$restaurant_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: "reviews",
          },
        },
        {
          $addFields: {
            reviews: "$reviews",
          },
        },
        ]
      return await restaurants.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`)
      throw e
    }
  }

  static async getCuisines() {
    /**
     * @return object containing all unique cuisines
     */
    let cuisines = []
    try{
      cuisines = await restaurants.distinct('cuisine')
      return cuisines
    } catch {
      console.log(`Unable to get cuisines, ${e}`)
      return cuisines
    }
  }

  static async getZipCodes() {
    let zipcode = []
    try{
      zipcode = await restaurants.distinct('address.zipcode')
      return zipcode
    } catch {
      console.log(`Unable to get cuisines, ${e}`)
      return zipcode
    }
  }


}

