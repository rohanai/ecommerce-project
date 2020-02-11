let users
let sessionStorage

  sessionStorage = global.window.sessionStorage


const server = {
  init () {
    if (sessionStorage.users === undefined) {
      const juan = 'juan'

      users = {
        [juan]: 'password'
      }

      sessionStorage.users = users
    } else {
      users = JSON.parse(sessionStorage.users)
    }
  },

  login (username, password) {
    const userExists = this.doesUserExist(username)

    return new Promise((resolve, reject) => {
      if (userExists && password == sessionStorage.users[username]) {
        sessionStorage.loggedIn = true;
        resolve({
          token: Math.random().toString(36).substring(7)
        })
      } else {
        let error

        if (userExists) {
          error = new Error('Wrong password')
        } else {
          error = new Error('User doesn\'t exist')
        }

        reject(error)
      }
    })
  },

  register (username, password) {
    return new Promise((resolve, reject) => {
      if (!this.doesUserExist(username)) {
        users[username] = password
        sessionStorage.setItem("users", JSON.stringify(users));
        resolve({registered: true})
      } else {
        reject(new Error('Username already in use'))
      }
    })
  },

  logout () {
    return new Promise(resolve => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('loggedIn')
      resolve(true)
    })
  },

  doesUserExist (username) {
    return !(sessionStorage.users[username] === undefined)
  }
}

server.init()

export default server
