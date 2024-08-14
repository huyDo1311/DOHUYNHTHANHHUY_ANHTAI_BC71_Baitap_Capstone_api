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


// renderCart();

// function renderCart() {
//   let content = '';
//   let data = cart.cartArray;
//   data.map((item) => {
//     content += `
//             <tr>
//               <td>${item.id}</td>
//               <td>${item.name}</td>
//               <td>
//                   <img style="width: 50px; height: 50px;" src="${item.img}" alt="" />
//               </td>
//               <td>${item.price}</td>
//               <td class="upDown">
//                   <button onclick="updateQuality('${item.id}',${true})" class="btn btn-success">+</button>${item.quality}<button onclick="updateQuality('${item.id}',${false})" class="btn btn-success">-</button>
//               </td>
//               <td>${(item.quality * item.price).toLocaleString()}</td>
//               <td>
//                   <button onclick="deleteProduct('${item.id}')" class="btn btn-danger">Xoá</button>
//               </td>
//             </tr>

//     `;
//   });
//   document.getElementById('cartTable').innerHTML = content;
// }
renderCart()
function renderCart() {
  let content = '';
  let data = cart.cartArray;
  data.map((item) => {
    content += `
      <tr>
        <th scope="col"><input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input"></th>
        <td>${item.id}</td>   
        <td><img src="${item.img}" alt="" style="width: 50px;height: 50px;"></td>
        <td>${item.name}</td>
        <td><p>${Number(item.price).toLocaleString()}</p></td>
        <td><div class="d-flex justify-content-end"><button onclick="updateQuality('${item.id}',${true})" class="btn btn-success">+</button></div></td>
        <td class="align-middle"><p class="text-bg-secondary text-center">${item.quality}</p></td>
        <td><button onclick="updateQuality('${item.id}',${false})" class="btn btn-success">-</button></td>
        <td>${(item.quality * item.price).toLocaleString()}</td>
        <td><button onclick="deleteProduct('${item.id}')" class="btn btn-danger">Delete</button></td>
      </tr>
    `;
  });
  let gioHang = document.getElementById('cartTable');
  if(gioHang){
    gioHang.innerHTML = content;
  } 
}

totalBill()

function totalBill() {
  let arr = cart.cartArray;
  let total = arr.reduce((cal, cur) => {
    return cal += cur.price * cur.quality;
  },0);
  let tingTong = document.getElementById('total');
  if(tingTong){
    tingTong.innerHTML = total.toLocaleString();
  }
  
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

document.getElementById('number').innerText = `(${totalQuality()})`;

// console.log(totalQuality());

// totalQuality() 

// function renderProduct(data) {
//   var content = "";
//   // let totalQuality = totalQuality();
//   data.map((item) => {
//     content += `<div class="item col-sx-12 col-md-6 col-xl-3 mb-2 p-2">
//                     <div class="card" style="">
//                     <img style="" src="${item.img}" class="card-img-top"/>
//                     <div class="card-body">
//                         <h4 class="card-title">${item.name}</h4>
//                         <p>${item.desc}</p>
//                         <p class="card-text">${item.price.toLocaleString()}</p>
//                         <button class="btn btn-success" onclick="addToCart('${item.id}','${item.name}','${item.price}','${item.img}')">Thêm vào giỏ hàng</button>
//                         <button class="btn btn-info mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
//                             <i class="fa fa-cart mr-5">
//                               <i class="fa fa-cart-arrow-down"></i>
//                             </i>
//   (${totalQuality()})Giỏ hàng
//                         </button>      
//                     </div>
//                     </div>
//                 </div>`;
//   });
//   document.getElementById("tblDanhSachSP").innerHTML = content;
// }

function renderProduct(data) {
  var content = "";
  // let totalQuality = totalQuality();
  data.map((item) => {
    content += `<div class="product_container col-12 col-md-6 col-xl-3 mb-2 p-4">

                    <div class="product_items ">
                        <div class="products ">
                            <div class="product_top">
                                <div class="img"><img src="${item.img}" alt=""></div>
                                <div class="product_name mt-2 mb-2">${item.name}</div>
                                <div class="product_desc mb-2">${item.desc}</div>
                            </div>
                            <div class="product_bottom">
                                <div class="button_buy p-3"><button onclick="addToCart('${item.id}','${item.name}','${item.price}','${item.img}')">Buy now</button></div>
                                <div class="price"><span>${item.price.toLocaleString()}$</span></div>
                            </div>
                        </div>
                    </div>
                    
                </div>`;
  });
  document.getElementById("productList").innerHTML = content;
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
  location.reload();
}