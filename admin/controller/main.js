
var urlAPI = "https://66a7891553c13f22a3d01a82.mockapi.io/Products";

function fetListProduct(){
    axios({
        url: urlAPI,
        method: "GET",
    }).then(function (res){
       renderProduct(res.data);
    })
    .catch(function (err){});
}
fetListProduct();
function renderProduct(listProduct) {
    // var listProduct = res.data;
    var contenHTML = "";
    for (var i = 0; i < listProduct.length; i++) {
        var trString = `<tr>
        <td>${listProduct[i].id}</td>
            <td>${listProduct[i].name}</td>
            <td>${listProduct[i].price}</td>
            <td><img src="${listProduct[i].img}"/></td>
            <td>${listProduct[i].desc}</td>
            <td>
                <button class='btn btn-danger' 
                onclick="deleteProduct(${listProduct[i].id})">Xóa</button>
                <button class='btn btn-dark' 
                onclick="editProduct(${listProduct[i].id})">Sửa</button>
            </td>
            
        </tr>`;
        contenHTML += trString;
    }
    document.getElementById('tblDanhSachSP').innerHTML = contenHTML;
}

function addProduct(){
    //laydata từ form
    var product = getDataForm();
    // asiox
    axios({ 
        url: urlAPI,
        method: "POST",
        data: product,
    })
    .then(function(res){
        //  đóng modal sau khi thêm thành công
        $("#myModal").modal("hide");
        // gọi lại api  lấy danh sách sản phẩm mới nhất từ sever sau khi thêm
        fetListProduct();
        console.log("yes them thanh cong")
    })
    .catch(function (err){
        console.log("khopng thanh cong",err)
    });
}

function deleteProduct(id){
    axios({
        url: `${urlAPI}/${id}`,
        method: "DELETE",
    }).then(function (res){
       fetListProduct();
    })
    .catch(function (err){});
}


function editProduct(id){
    axios({
        url: `${urlAPI}/${id}`,
        method: "GET",
    }).then(function (res){
       var  product = res.data;
       $("#myModal").modal("show");

    document.getElementById("TenSP").value = product.name;
    document.getElementById("GiaSP").value = product.price;
    document.getElementById("HinhSP").value = product.img;
    document.getElementById("MoTaSP").value = product.desc;
    document.getElementById("product-id").innerText = product.id;
    })
    .catch(function (err){});
}
function updateProduct() {
    var id = document.getElementById("product-id").innerText;

    var prodcut = getDataForm();

    axios({
        url: `${urlAPI}/${id}`,
        method: "PUT",
        data: prodcut,
    }).then(function (res){
        $("#myModal").modal("hide");
       fetListProduct();
    })
    .catch(function (err){});

}

function getDataForm() {
    var name = document.getElementById("TenSP").value;
    var price = document.getElementById("GiaSP").value;
    var img = document.getElementById("HinhSP").value;
    var desc = document.getElementById("MoTaSP").value;
    // tao object
    return  {
        name: name,
        price: price,
        img: img,
        desc: desc,
    };
}


// renderProduct();
