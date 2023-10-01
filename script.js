const section = document.querySelectorAll('section')

window.onscroll=()=>{
    section.forEach(sec=>{
        let top = window.scrollY;
        let offset = sec.offsetTop-150;
        let height = sec.offsetHeight;
        if (top > offset && top < offset + height) {
            sec.classList.add("start-animation")
        } else {
            sec.classList.remove("start-animation")
        }
    })
}

console.log('Thanks you Hash Techie for the tutorial <3')