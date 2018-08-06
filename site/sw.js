// console.log('service worker')

// const arquivos = [
//     '/',
// ]


// self.addEventListener('install', function() {
    
// })


// self.addEventListener('push', function() {
//     //. 
// })

// self.addEventListener('activate', function() {
//     caches.open('alura-arquivos').then((cache) => {
//         cache.addAll(arquivos)
//         .then(() => {
//             console.log('Instalou o cache inicial')
//         })
//     })
// })

// self.addEventListener('fetch', function(event) {
//     let pedido = event.request

//     caches.match(pedido).then((respostaDoCache) => {

//         let resposta = respostaDoCache ? respostaDoCache : fetch(pedido)
//         return resposta
//     })

//     // console.log('Show', event.request.url)
//     // fetch('https://api.github.com/users/omariosouto').then((response) => {
//     //     caches.open('arquivos-da-alura').then((cache) => {
//     //         cache.put('https://api.github.com/users/omariosouto', response)
//     //     })
//     // })
// })