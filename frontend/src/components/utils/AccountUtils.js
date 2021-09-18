
function getAccountName (id, accounts) {
    let results = accounts.filter((acc) => acc.id === id)
    let first = results[0]
    if (first){
        return first.name
    }
    return "Not Found"
}