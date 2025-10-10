let inventory = []

function add_product() {
    const nameInp = document.getElementById("product-name");
    const priceInp = document.getElementById("price");
    const qntInp = document.getElementById("quantity");

    const name = nameInp.value.trim();
    const price = parseFloat(priceInp.value);
    const quantity = parseInt(qntInp.value);

    if (name === "") {
        alert("! Please Enter the product name !");
        return;
    }

    if (isNaN(price) || price < 0) {
        alert("! Please Enter the price of the product !");
        return;
    }

    if (isNaN(quantity) || quantity < 0) {
        alert("! Please Enter the quantity of the product !");
        return;
    }

    inventory.push({name : name, price : price, quantity : quantity})

    nameInp.value = "";
    priceInp.value = "";
    qntInp.value="";

    dis_inv();
      
}

function dis_inv() {
    const tbody = document.getElementById("inv-body");
    tbody.innerHTML = "";


    inventory.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML=`<td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>`;
        tbody.appendChild(row);
    })
}