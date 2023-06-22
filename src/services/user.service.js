import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const PAGE_SIZE = 5
const USER_KEY = 'userDB'

var gFilterBy = { balance: 0, transactions: [] }
var gSortBy = { name: 1 }
var gPageIdx

_createUsers()


export const userService = {
    query,
    get,
    remove,
    save,
    getEmptyUser,
    getNextUserId,
    getFilterBy,
    setFilterBy,
    getUserCountBySpeedMap
}

function query() {
    return storageService.query(USER_KEY)
        .then(users => {
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')
                users = users.filter(user => regex.test(user.name))
            }
            if (gFilterBy.balance) {
                users = users.filter(user => user.balance >= gFilterBy.balance)
            }
            if (gPageIdx !== undefined) {
                const startIdx = gPageIdx * PAGE_SIZE
                users = users.slice(startIdx, startIdx + PAGE_SIZE)
            }
            if (gSortBy.balance !== undefined) {
                users.sort((c1, c2) => (c1.balance - c2.balance) * gSortBy.balance)
            } else if (gSortBy.name !== undefined) {
                users.sort((c1, c2) => c1.name.localeCompare(c2.name) * gSortBy.name)
            }

            return users
        })
}

function get(userId) {
    return storageService.get(USER_KEY, userId)
}

function remove(userId) {
    return storageService.remove(USER_KEY, userId)
}

function save(user) {
    if (user.id) {
        return storageService.put(USER_KEY, user)
    } else {
        return storageService.post(USER_KEY, user)
    }
}

function getEmptyUser(name = '', balance = 0, transactions = []) {
    return { id: '', name, balance, transactions }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.name !== undefined) gFilterBy.name = filterBy.name
    if (filterBy.balance !== undefined) gFilterBy.balance = filterBy.balance
    return gFilterBy
}

function getNextUserId(userId) {
    return storageService.query(USER_KEY)
        .then(users => {
            var idx = users.findIndex(user => user.id === userId)
            if (idx === users.length - 1) idx = -1
            return users[idx + 1].id
        })
}

function getUserCountBySpeedMap() {
    return storageService.query(USER_KEY)
        .then(users => {
            const userCountBySpeedMap = users.reduce((map, user) => {
                if (user.balance < 120) map.slow++
                else if (user.balance < 200) map.normal++
                else map.fast++
                return map
            }, { slow: 0, normal: 0, fast: 0 })
            return userCountBySpeedMap
        })
}

function _createUsers() {
    let users = utilService.loadFromStorage(USER_KEY)
    if (!users || !users.length) {
        users = []
        users.push(_createUser('yoni', 300))
        users.push(_createUser('tedi', 120))
        users.push(_createUser('timor', 100))
        users.push(_createUser('natan', 150))
        utilService.saveToStorage(USER_KEY, users)
    }
}

function _createUser(name, balance = 100, transactions) {
    const user = getEmptyUser(name, balance, transactions)
    user.id = utilService.makeId()
    return user
}