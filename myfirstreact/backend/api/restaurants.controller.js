import RestaurantsDAO from '../dao/restaurantsDAO.js'
// GETS FUNCTIONS TO QUERY THE DATABASE FROM ../Dao folder

export default class RestaurantsController {
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static async apiGetRestaurants(req, res, next) {
    console.log(`in RestaurantsController req: ${req}\nres: ${res}, next${next}`)
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(
      req.query.restaurantsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    }
    else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    }
    else if (req.query.name) {
      filters.name = req.query.name
    }
    
    console.log(`Filters from apiGetRestaurants() ${filters}`)
    const {restaurantsList, totalNumRestaurants} = await RestaurantsDAO.getRestaurants({
      filters,
      page,
      restaurantsPerPage,
    })
    
    let response = { //what the response object will look like when sent to the API
      restaurants: restaurantsList,
      page: page,
      filters: filters,
      entries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants,
    }
    res.json(response) // send out the response
  }

  static async apiGetRestaurantById(req, res, next) {
    try {
      let id = req.params.id || {}
      let restaurant = await RestaurantsDAO.getRestaurantByID(id)
      if (!restaurant) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(restaurant)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetCuisines(req, res, next) {
    try {
      let cuisines = await RestaurantsDAO.getCuisines() 
      res.json(cuisines) //makes it readable
    } catch (e) {
      console.log(`issue with the api apiGetRestaurantCuisines(), ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetZipCodes(req, res, next) {
    try {
      let zipcode = await RestaurantsDAO.getZipCodes()
      res.json(zipcode)
    } catch (e) {
      console.log(`issue with the api apiGetRestaurantZipCodes(), ${e}`)
      res.status(500).json({ error: e })
    }
  }
}