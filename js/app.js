// app.js
import { Games } from "./controllers/games_controller.js"

const application = Stimulus.Application.start()
application.register("games", Games)

console.log("ready...")
