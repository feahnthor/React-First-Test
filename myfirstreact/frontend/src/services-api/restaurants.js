import http from '../http-common';

class RestaurantDataService {
  /**
   * 
   */
  getAll(page=0) {//get all and sets page to view
    return http.get(`?page=${page}`)
  }

  getCuisines(id) {
    return http.get(`/cuisines`)
  }

  get(id) {
    return http.get(`/restaurant?id=${id}`);
  }

  find(query, by = "name", page = 0) {
    console.log(`queery find ${query}`)
    return http.get(`?${by}=${query}&page=${page}`);
  } 

  createReview(data) {
    return http.post("/review-new", data);
  }

  updateReview(data) {
    return http.put("/review-edit", data);
  }

  deleteReview(id, userId) {
    return http.delete(`/review-delete?id=${id}`, {data:{user_id: userId}});
  }

  getZipcode(id) {
    return http.get(`/zipcodes`)
  }

}

export default new RestaurantDataService();