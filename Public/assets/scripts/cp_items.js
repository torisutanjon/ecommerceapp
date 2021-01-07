/*
function getdata(json data from computer parts controller[image, int, string, string]){
    **distribute the data to each element**
}
*/
// this is for loopSideDive. The script is in another file
var imported = document.createElement('script')
imported.src = '/assets/scripts/item_category.js'
document.head.appendChild(imported)

//when the page done loading
window.onload = function() {
    loopMainDiv()
    loopSideDiv()
}

var i

var item_image
var item_category = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6", "Category 7", "Category 8", "Category 9", "Category 10"]
var item_name = ["Name1", "Name2", "Name3", "Name4", "Name5", "Name6", "Name7", "Name8", "Name9", "Name10"]
var item_price = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110]
var item_discounted_price = [51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
var itemcount

//making the div to be appended as child to the maindiv
try {
    function createMainDiv(category, name, price, discountprice) {
        //creating of the item-div
        const itemsdiv = document.createElement('div')
        itemsdiv.classList.add('item-div')
        itemsdiv.title = "Click to View"
        itemsdiv.id = `itemdiv${i + 1}`
        itemsdiv.addEventListener('click', (e) => {
            openhiddendiv()
            getclickedid(e.target.id)
        }, false)

        //creating of img tag in item-div
        const img = document.createElement('img')
        img.classList.add('image-name')
        img.setAttribute('id', 'itemimage' + i)

        //creating the p tag for item category
        const itemCategory = document.createElement('p')
        itemCategory.classList.add('item-category')
        itemCategory.textContent = category
        itemCategory.setAttribute('id', 'itemcategory' + i)

        //creating the p for item name
        const itemName = document.createElement('p')
        itemName.classList.add('item-name')
        itemName.textContent = name
        itemName.setAttribute('id', 'itemname' + i)

        //creating the p for item price
        const itemPrice = document.createElement('p')
        itemPrice.classList.add('item-price')
        itemPrice.textContent = price
        itemPrice.setAttribute('id', 'itemprice' + i)

        //creating the p for item discounted price
        const itemDiscountedPrice = document.createElement('p')
        itemDiscountedPrice.classList.add('item-discounted-price')
        itemDiscountedPrice.textContent = discountprice
        itemDiscountedPrice.setAttribute('id', 'itemdiscountedprice' + i)

        //creating the add to cart button
        const button = document.createElement('button')
        button.classList.add('cart-btn')
        button.textContent = "Add to Cart"
        button.title = "Add to Cart"

        //appending all those tag on item div
        itemsdiv.appendChild(img)
        itemsdiv.appendChild(itemCategory)
        itemsdiv.appendChild(itemName)
        itemsdiv.appendChild(itemPrice)
        itemsdiv.appendChild(itemDiscountedPrice)
        itemsdiv.appendChild(button)

        //appending the item div on the main div
        return itemsdiv
    }
} catch (error) {
    console.log(error)
    alert(`A bug occured please redo what you just did \n Sorry for incovinience`)
}
//-------------------------------------------------------------

//create main item div
try {
    function loopMainDiv() {
        if (item_category.length && item_name.length === item_price.length) {
            itemcount = item_category.length
            for (i = 0; i < itemcount; i++) {
                document.getElementById('maindiv').appendChild(createMainDiv(item_category[i], item_name[i], item_price[i], item_discounted_price[i]))
            }
        } else {
            alert('Database error')
            window.location.replace('/orderpage')
        }
    }
} catch (error) {
    console.log(error)
    alert(`A bug occured please redo what you just did \n Sorry for incovinience`)
}
//create side div
try {
    function loopSideDiv() {
        if (document.getElementsByClassName('category_div').textContent != "" || document.getElementsByClassName(category_div).textContent != null) {
            for (categoryCounter = 0; categoryCounter < categoryname.length; categoryCounter++) {
                createSideDiv()
            }
        }
    }
} catch (error) {
    console.log(error)
    alert(`A bug occured please redo what you just did \n Sorry for incovinience`)
}

//opening and closing of div when itemdiv is clicked for better item details presentation
function openhiddendiv() {
    document.getElementById('clickedDiv').style.display = "block";
}

try {
    function closehiddendiv() {
        document.getElementById('clickedDiv').style.display = "none";
        //set the textContent of hidden div to default with no value
        document.getElementById('clicked_div_item_category').textContent = 'Category : '
        document.getElementById('clicked_div_item_name').textContent = 'Name : '
        document.getElementById('clicked_div_item_price').textContent = 'Price : '
        document.getElementById('clicked_div_discounted_price').textContent = 'Discounted Price : '
    }
} catch (error) {
    console.log(error)
    alert(`A bug occured please redo what you just did \n Sorry for incovinience`)
}

//getting the data from the item div

try {
    function getclickedid(id) {
        var clicked_div = document.getElementById(id)
        var clickeditemimage = clicked_div.getElementsByClassName('image-name')[0]
        var clickeditemcategory = clicked_div.getElementsByClassName('item-category')[0].textContent
        var clickeditemname = clicked_div.getElementsByClassName('item-name')[0].textContent
        var clickeditemprice = clicked_div.getElementsByClassName('item-price')[0].textContent
        var clickeditemdiscountprice = clicked_div.getElementsByClassName('item-discounted-price')[0].textContent

        assigndata(clickeditemcategory, clickeditemname, clickeditemprice, clickeditemdiscountprice)
    }
    //putting div to hidden div
    function assigndata(category, name, price, discountprice) {
        document.getElementById('clicked_div_item_category').textContent = document.getElementById('clicked_div_item_category').textContent + category
        document.getElementById('clicked_div_item_name').textContent = document.getElementById('clicked_div_item_name').textContent + name
        document.getElementById('clicked_div_item_price').textContent = document.getElementById('clicked_div_item_price').textContent + price
        document.getElementById('clicked_div_discounted_price').textContent = document.getElementById('clicked_div_discounted_price').textContent + discountprice
    }
} catch (error) {
    console.log(error)
    alert(`A bug occured please redo what you just did \n Sorry for incovinience`)
}
//compare clicked category div textContent(category) to item divs textContent(category)
//get id of all item divs that matched
//store those item divs children text context to arrays
try {
    function categoryClicked(id) {
        loopMainDiv()

        var foundcounter = 0
        var parentid
        var childcategory = []
        var childname = []
        var childprice = []
        var childdiscountprice = []

        for (var x = 1; x <= item_category.length; x++) {
            if (document.getElementById(id).textContent == document.getElementsByClassName('item-category')[x].textContent) {

                parentid = document.getElementsByClassName('item-category')[x].parentNode.id
                var parent = document.getElementById(parentid)
                childcategory[foundcounter] = parent.children[1].textContent
                childname[foundcounter] = parent.children[2].textContent
                childprice[foundcounter] = parent.children[3].textContent
                childdiscountprice[foundcounter] = parent.children[4].textContent

                foundcounter++
                console.log(x)
                console.log(`${document.getElementsByClassName('item-category')[x].textContent}`)
            }
        }

        //delete all the child
        document.getElementById('maindiv').innerHTML = ''

        //repopulate item div with only the clicked category description
        for (var y = 0; y < foundcounter; y++) {
            document.getElementById('maindiv').appendChild(createMainDiv(childcategory[y], childname[y], childprice[y], childdiscountprice[y]))
        }
    }
} catch (error) {
    console.log(error)
    alert(`A bug occured please redo what you just did \n Sorry for incovinience`)
}