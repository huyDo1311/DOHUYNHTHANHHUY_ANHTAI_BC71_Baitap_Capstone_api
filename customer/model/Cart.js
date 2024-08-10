class Cart {
    cartArray = [];
    constructor() {
        this.cartArray = [];
    }
    addProductsToCart(product) {
        this.cartArray.push(product);
    }
    findIndexProductInCartArray(id) {
        return this.cartArray.findIndex(item => item.id === id);
    }
    deleteProductFromCart(id) {
        let indexItem = this.findIndexProductInCartArray(id)

        if(indexItem > -1){
            this.cartArray.splice(indexItem,1);
        } else {
            alert("Can't delete item");
        }
    }
    updateQualityOfProduct(id, increaseQuantity) {

        let indexItem = this.findIndexProductInCartArray(id);
        // let quality = this.cartArray[indexItem].quality;
        if(indexItem !== -1){
            if(increaseQuantity){
                this.cartArray[indexItem].quality += 1;
            } else {
                if(this.cartArray[indexItem].quality > 1){
                    this.cartArray[indexItem].quality -= 1;
                } else {
                    alert('Minimum quantity is 1');
                }
            }
        }

        // console.log(this.cartArray);
        

    }

}