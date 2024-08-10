var samsungLists = [];
var iphoneLists = [];
var productsList = [];
var cart = new Cart();

// getLocalStorage();
// getData();
// function getData() {
// }
var cartData = getLocalStorage();
cart.cartArray = [];
cartData.map((item) => {
  let cartItem = new CartItem(item.id, item.name, item.price, item.img, item.quality);
  return cart.addProductsToCart(cartItem);
});

// var cartData = getLocalStorage();
// cart.cartArray = [];
// cartData.map((item) => {
//   let cartItem = new CartItem(item.id, item.name, item.price, item.img, item.quality);
//   return cart.addProductsToCart(cartItem);
// });


renderCart();

function renderCart() {
  let content = '';
  let data = cart.cartArray;
  data.map((item) => {
    content += `
            <tr>
              <td>${item.id}</td>
              <td>${item.name}</td>
              <td>
                  <img style="width: 50px; height: 50px;" src="${item.img}" alt="" />
              </td>
              <td>${item.price}</td>
              <td class="upDown">
                  <button onclick="updateQuality('${item.id}',${true})" class="btn btn-success">+</button>${item.quality}<button onclick="updateQuality('${item.id}',${false})" class="btn btn-success">-</button>
              </td>
              <td>${(item.quality * item.price).toLocaleString()}</td>
              <td>
                  <button onclick="deleteProduct('${item.id}')" class="btn btn-danger">Xoá</button>
              </td>
            </tr>
       
    `;
  });
  document.getElementById('cartTable').innerHTML = content;
}

totalBill()
function totalBill() {
  let arr = cart.cartArray;
  let total = arr.reduce((cal, cur) => {
    return cal += cur.price * cur.quality;
  },0);

  document.getElementById('total').innerHTML = total.toLocaleString();
}

function pushProductToLists(resList) {
  for (let i in resList) {
    let isTypeProduct = resList[i].type;
    if (isTypeProduct === "Samsung") {
      samsungLists.push(resList[i]);
    } else {
      iphoneLists.push(resList[i]);
    }
  }
}

function fetchListProduct() {
  //   onLoading();
  getListService()
    .then(function (res) {
      pushProductToLists(res.data);
      renderProduct(res.data);
      //   offLoading();3
    })
    .catch(function (err) {
      // console.log(err);
      //   offLoading();
    });
}

fetchListProduct();

function totalQuality() {
  var arr = cart.cartArray;
  return arr.reduce((cal, cur) => {
    return cal += cur.quality;
  },0);
}

// console.log(totalQuality());

// totalQuality() 

function renderProduct(data) {
  var content = "";
  // let totalQuality = totalQuality();
  data.map((item) => {
    content += `<div class="item col-sx-12 col-md-6 col-xl-3 mb-2 p-2">
                    <div class="card" style="">
                    <img style="" src="${item.img}" class="card-img-top"/>
                    <div class="card-body">
                        <h4 class="card-title">${item.name}</h4>
                        <p class="card-text">${item.price.toLocaleString()}</p>
                        <button class="btn btn-success" onclick="addToCart('${item.id}','${item.name}','${item.price}','${item.img}')">Thêm vào giỏ hàng</button>
                        <button class="btn btn-info mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i class="fa fa-cart mr-5">
                              <i class="fa fa-cart-arrow-down"></i>
                            </i>
  (${totalQuality()})Giỏ hàng
                        </button>      
                    </div>
                    </div>
                </div>`;
  });
  document.getElementById("tblDanhSachSP").innerHTML = content;
}

function filterProduct() {
  let type = document.getElementById("typeproduct").value;
  if (type === "Samsung") {
    renderProduct(samsungLists);
  } else if (type === "Iphone") {
    renderProduct(iphoneLists);
  } else {
    samsungLists = [];
    iphoneLists = [];
    fetchListProduct();
  }
}

function addToCart(id, name, price, img) {
  var item = new CartItem(id, name, price, img, 1);
  let index = cart.findIndexProductInCartArray(item.id);
  if(index !== -1) {
      cart.cartArray[index].quality += 1;
      console.log('cart.cartArray :>> ', cart.cartArray);
      setLocalStorage(cart.cartArray);
      renderCart();
      location.reload();
  } else {
      cart.addProductsToCart(item);
      setLocalStorage(cart.cartArray);
      renderCart();
      location.reload();
  }
}

function setLocalStorage(arr) {
  localStorage.setItem("Cart", JSON.stringify(arr));
}

function getLocalStorage() {
  cart.cartArray = localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) : [];
  return cart.cartArray;
}

function deleteProduct(id) {
  cart.deleteProductFromCart(id);
  setLocalStorage(cart.cartArray);
  totalBill()
  renderCart();
}

function updateQuality(id,upOrDown) {
  let cartUpdate = cart.updateQualityOfProduct(id, upOrDown);
  setLocalStorage(cart.cartArray);
  totalBill()
  renderCart();
}

function payment() {
  cart.cartArray = [];
  setLocalStorage(cart.cartArray);
  totalBill()
  renderCart();
  alert('Thanh toán thành công');
}