import _ from "lodash"

class Helper {
  log = (message) => {
    if (_.isObject(message)) {
      console.log(JSON.stringify(message, null, 2))
    } else {
      console.log(message)
    }
  }
}

export default new Helper()
