import express from "express"
import cors from "cors"
import restaurants from "./api/test.route.js"

const app = express()

app.use(cors())
app.use(express.json()) //replacement for body pareser

//specifiy initial routes; url to start on
app.use("/api/v1/restaurants", restaurants) //THIS TELLS THE BASE URL and gets data
//from the router which is the route.js file
app.use("*", (req, res) => res.status(404).json({error: "page not found"}))

export default app

