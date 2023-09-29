/**
 * Define Global Variables
 *
 */
const navbar = document.getElementById('navbar__list');
const headerE = document.querySelector('.page__header');
const sections = document.querySelectorAll('.section');
const btnTopE = document.getElementById('topbtn');
let hiddenNavTimer;

/**
 * End Global Variables
 * Begin for declare Functions
 *
 */
function genNavBar() {
    const liMenu = document.createDocumentFragment()
    for (let i = 1; i <= sections.length; i++) {
        const liElemt = document.createElement('li')
        const aElem = document.createElement('a')
        aElem.textContent = 'Section ' + i
        aElem.classList.add('menu__link')
        aElem.setAttribute('id', 'section-' + i)
        liElemt.appendChild(aElem)
        liMenu.appendChild(liElemt)
    }
    navbar.appendChild(liMenu)
}

/**
 * End for declare Functions
 * Begin Main
 *
 */

// build the nav
genNavBar()

// Scroll to anchor ID using scrollTO
btnTopE.addEventListener('click', e => {
    e.preventDefault
    window.scrollTo(0, 0)
})

// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', (e) => {
    e.preventDefault();

    // Display Go Top Button when the user scrolls below the fold of the page.
    if (this.scrollY < window.innerHeight) {
        btnTopE.style.display = 'none'
    } else {
        btnTopE.style.display = 'block'
    }

    // Hide fixed navigation bar while not scrolling
    headerE.classList.add('fixed_menu')
    clearTimeout(hiddenNavTimer)
    btnTopE.style.top = ''
    hiddenNavTimer = setTimeout(() => {
        headerE.classList.remove('fixed_menu')
        btnTopE.style.top = '0'
    }, 2000)

    sections.forEach(section => {
        const box = section.getBoundingClientRect()
        section.classList.remove('active-cls')
        if (box.top <= 150 && box.bottom >= 150) {
            section.classList.add('active-cls')
        }
    })
})

// Scroll to section on link click
navbar.addEventListener('click', function (e) {
    e.preventDefault;
    const target = e.target
    if (target.nodeName == 'A') {
        const secId = target.getAttribute('id');
        const activeElem = document.querySelector(`[data-nav='${secId}'`);
        headerE.classList.remove('fixed_menu')
        //window.scrollIntoView(activeElem.offsetTop + (headerE.classList.contains('fixed_menu') ? headerE.offsetHeight : 0)); // su dung chinh xac vi tri hon
        activeElem.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" }); // cho phep hieu ung, smooth
        headerE.classList.add('fixed_menu')
    }
})

/**
 * End Main
 *
 */
