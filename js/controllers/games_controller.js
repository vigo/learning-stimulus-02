// games_controller.js

const GAME_UI_ELEMENT = `
<div class="lg:w-1/4 md:w-1/2 p-4 w-full" data-target="games.game">
    <a class="block relative h-48 rounded overflow-hidden">
        <img alt="" class="object-cover object-center w-full h-full block" src="" data-target="games.cover">
    </a>
    <div class="mt-4">
        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1" data-target="games.category"></h3>
        <h2 class="text-gray-900 title-font text-lg font-medium" data-target="games.name"></h2>
        <p class="mt-1" data-target="games.year"></p>
    </div>
</div>
`

const SANITIZED_INPUT_MAP = {
  default: (input) => input.toLowerCase(),
}

const gamesList = [
  { name: "Impossible Mission", category: "COMMODORE 64", year: "1984" },
  { name: "California Games", category: "COMMODORE 64", year: "1987" },
  { name: "One Man and His Droid", category: "COMMODORE 16", year: "1985" },
  { name: "Tom Thumb", category: "COMMODORE 16", year: "1986" },
  { name: "Pets Rescue", category: "COMMODORE PLUS 4", year: "2018" },
  { name: "Shadow of the Beast", category: "AMIGA 500", year: "1989" },
  { name: "Alien Breed 3D", category: "AMIGA 1200", year: "1995" },
  { name: "Alpharay", category: "COMMODORE PLUS 4", year: "2019" },
]

export class Games extends Stimulus.Controller {
  static get targets() {
    return [
      "collection",
      "nameFilter",
      "foundNothing",
      "game",
      "category",
      "name",
      "year",
      "cover",
    ]
  }

  initialize() {
    console.log("initialize...")

    gamesList.forEach((game, index) => {
      this.collectionTarget.innerHTML += GAME_UI_ELEMENT

      this.nameTargets[index].textContent = game.name
      this.categoryTargets[index].textContent = game.category
      this.yearTargets[index].textContent = game.year
      let coverHeight = 260 + index
      this.coverTargets[index].src = `https://dummyimage.com/420x${coverHeight}`
      this.coverTargets[index].alt = `Cover of ${game.name} / ${game.category}`
    })
    this.filteredCount = gamesList.length
    this.showHideNotFoundMessage()
  }

  connect() {
    console.log("connected to dom...")
    console.log("filteredCount", this.filteredCount)
  }

  showHideNotFoundMessage() {
    console.log("alo", this.filteredCount)
    let hasHiddenClass = this.foundNothingTarget.classList.contains("hidden")
    console.log("hasHiddenClass", hasHiddenClass)

    if (this.filteredCount == 0 && hasHiddenClass) {
      this.foundNothingTarget.classList.remove("hidden")
    }
    if (this.filteredCount > 0 && !hasHiddenClass) {
      this.foundNothingTarget.classList.add("hidden")
    }
  }

  filterCollection(event) {
    const USER_INPUT = event.target.value
    const SANITIZED_INPUT = (
      SANITIZED_INPUT_MAP[event.target.name] || SANITIZED_INPUT_MAP["default"]
    )(USER_INPUT)

    this.filteredCount = 0
    this.gameTargets.forEach((element) => {
      let forceValue = !element.textContent
        .toLowerCase()
        .includes(SANITIZED_INPUT)
      if (!forceValue) {
        this.filteredCount++
      }
      element.classList.toggle("hidden", forceValue)
    })
    this.showHideNotFoundMessage()
  }

  // getter
  get filteredCount() {
    return this.data.get("filteredCount")
  }

  // setter
  set filteredCount(value) {
    this.data.set("filteredCount", value)
  }
}
