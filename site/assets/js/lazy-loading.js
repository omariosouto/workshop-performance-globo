window.onscroll = function () {
    console.log('Olha que doido')
    // Trocar o data-src para src
    const imgs = document.querySelectorAll('img[data-src]')
    // console.log(img.getBoundingClientRect().top)
    // console.log(window.innerHeight)

    for(img of imgs) {
        if(img.getBoundingClientRect().top < window.innerHeight) {
            img.src = img.getAttribute('data-src')
        }
    }
}