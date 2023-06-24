export const userService = {
    getUser,
}

function getUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(user)
        }, 1000)
    })
}

const user = {
    name: "Noam Green",
    balance: 100,
    transactions: [],
}
