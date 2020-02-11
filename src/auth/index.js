import request from './fakeRequest'

let sessionStorage

sessionStorage = global.window.sessionStorage;

const auth = {
  login (username, password) {
    if (auth.loggedIn()) return Promise.resolve(true)

    return request.post('/login', {username, password})
      .then(response => {
        sessionStorage.token = response.token
        return Promise.resolve(true)
      })
  },

  logout () {
    return request.post('/logout')
  },

  loggedIn () {
    return !!sessionStorage.token
  },

  register (username, password) {
    return request.post('/register', {username, password})
      .then(() => auth.login(username, password))
  },
  onChange () {}
}

export default auth
