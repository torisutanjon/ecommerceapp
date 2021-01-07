var categoryname = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6", "Category 7", "Category 8", "Category 9", "Category 10"]
var categoryCounter
var isclose = false

function createSideDiv() {
    const categorydiv = document.createElement('div')
    categorydiv.classList.add('category_div')
    categorydiv.setAttribute('id', 'categorydiv' + categoryCounter)
    categorydiv.addEventListener('click', (event) => {
        categoryClicked(event.currentTarget.id)
    }, false)


    const categoryp = document.createElement('p')
    categoryp.classList.add('category_p')
    categoryp.textContent = categoryname[categoryCounter]

    categorydiv.appendChild(categoryp)

    document.getElementById('side-bar').appendChild(categorydiv)
}

function sidebarslide() {

    var sidebar = document.getElementById('side-bar')

    if (isclose == false) {
        sidebar.style.width = 0
        maindiv.style.cssText = "left:5%; width:90%;"
        isclose = true
    } else if (isclose == true) {
        sidebar.style.width = '250px'
        maindiv.style.cssText = 'left:275px; width:82.5%;'
        isclose = false
    } else {
        alert('Some Error Occured Please Retry')
        window.location('/orderpage')
    }
}