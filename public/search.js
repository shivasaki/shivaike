const algoliasearch = require('algoliasearch')
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY)
const index = client.initIndex('Index NAME')
index
    .search({
        query: 'hogehoge'
    })
    .then(function (responses) {
        console.log(responses.hits)
    })