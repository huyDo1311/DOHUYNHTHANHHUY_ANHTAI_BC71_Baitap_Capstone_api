var urlApi = "https://66a7891553c13f22a3d01a82.mockapi.io/Products";

function getListService() {
  return axios({
    url: urlApi,
    method: "GET",
  });
}

// function deleteService(id) {
//   return axios({
//     url: `${urlApi}/${id}`,
//     method: "DELETE",
//   });
// }

// function createService(product) {
//   return axios({
//     url: urlApi,
//     method: "POST",
//     data: product,
//   });
// }

// function editService(id) {
//   return axios({
//     url: `${urlApi}/${id}`,
//     method: "GET",
//   });
// }

// function updateService(id,product) {
//   return axios({
//     url: `${urlApi}/${id}`,
//     method: "PUT",
//     data: product,
//   });
// }

// let pruductService = {
//     getList: function() {},
//     delete: function(id) {},
//     create: function(product) {},
//     getDetail: function(id) {},
//     update: function(id,product) {}
// }
