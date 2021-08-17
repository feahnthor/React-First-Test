import express from 'express'
import RestaurantsCtrl from './restaurants.controller.js'


/*THIS IS WHAT SENDS BACK RESPONSES, this picks up the data and exports it to
be used by index.js, which data is sent is decided here after going to the DAO*/

const router = express.Router()

router.route('/').get(RestaurantsCtrl.apiGetRestaurants)
router.route('/cuisines').get(RestaurantsCtrl.apiGetCuisines)
router.route('/zipcodes').get(RestaurantsCtrl.apiGetZipCodes)
router.route('/id/:id').get(RestaurantsCtrl.apiGetRestaurantById)
router.route('/test').get((req, res) => res.send('{Hello World! My Name is: False} '))

export default router