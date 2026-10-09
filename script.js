const menu=[
    ["Malai Chaap","chaap",170,230],["Afghani Chaap","chaap",170,230],["Achari Chaap","chaap",170,230],
    ["Garlic Pudina Chaap","chaap",170,230],["Punjabi Spicy Chaap","chaap",170,230],["Hariyali Chaap","chaap",170,230],
    ["Masala Paneer Tikka","tikka",200,270],["Sunny Leone Chaap","chaap",170,230],["Mushroom Tikka","tikka",200,270],
    ["Veg. Tandoori Platter","tikka",200,270],["Afghani Paneer Tikka","tikka",200,270],["Malai Paneer Tikka","tikka",200,270],
    ["Lemon Chaap","chaap",170,230],["Masala Chaap","chaap",170,230],["KFC Chaap","chaap",170,230],
    ["Chaap Roll","rolls",130,null],["Paneer Roll","rolls",150,null],["Veg. Beliram Chaap","gravy",160,250],
    ["Veg. Butter Chaap","gravy",160,250],["Veg. Korma Chaap","gravy",160,250],["Veg. Roman Josh","gravy",160,250],
    ["Gravy Chaap","gravy",160,250],["Handi Chaap with Gravy","gravy",280,null],["Rumali Roti","bread",25,null]
];

let cart=[];
const grid=document.getElementById("grid");

function render(cat="all"){
    grid.innerHTML="";
    menu.filter(x=>cat==="all"||x[1]===cat).forEach((x)=>{
        let c=document.createElement("div");
        c.className="card";
        c.innerHTML=`<h3>${x[0]}</h3><div class="desc">Freshly prepared Punjabi-style ${x[0].toLowerCase()}.</div><div class="prices"><button data-i="${menu.indexOf(x)}" data-size="Half">Half ₹${x[2]}</button>${x[3]?`<button data-i="${menu.indexOf(x)}" data-size="Full">Full ₹${x[3]}</button>`:""}</div>`;
        grid.appendChild(c);
    });
}

grid.addEventListener("click",e=>{
    if(!e.target.dataset.i)return;
    let x=menu[e.target.dataset.i],size=e.target.dataset.size,price=size==="Full"?x[3]:x[2];
    cart.push({name:x[0],size,price});
    updateCart();
    document.getElementById("cart").classList.add("open");
});

function updateCart(){
    document.getElementById("items").innerHTML=cart.length?cart.map((x,i)=>`<div class="cartitem"><b>${x.name}</b><br>${x.size} — ₹${x.price} <button onclick="removeItem(${i})">✕</button></div>`).join(""):"<p style='color:#999'>Your order is empty.</p>";
    document.getElementById("total").textContent="₹"+cart.reduce((a,x)=>a+x.price,0);
    document.getElementById("count").textContent=cart.length;
}

function removeItem(i){
    cart.splice(i,1);
    updateCart();
}

document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{
    document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    render(b.dataset.cat);
});

document.getElementById("fab").onclick=()=>document.getElementById("cart").classList.add("open");
document.getElementById("close").onclick=()=>document.getElementById("cart").classList.remove("open");
document.getElementById("clear").onclick=()=>{cart=[];updateCart();};

document.getElementById("wa").onclick=()=>{
    if(!cart.length) return alert("Please add an item first.");
    
    // Get the new values from the form
    const orderType = document.querySelector('input[name="orderType"]:checked').value;
    const pickupTime = document.getElementById("pickupTime").value;
    
    // Check if they selected a time
    if (!pickupTime) return alert("Please select a pickup time from the dropdown.");

    let total=cart.reduce((a,x)=>a+x.price,0);
    
    // Build the new WhatsApp message
    let msg="Hello Punjabi Chaap Truck!\n\n";
    msg += "👤 Order Type: " + orderType + "\n";
    msg += "⏰ Pickup Time: " + pickupTime + "\n\n";
    msg += "🛒 Items:\n" + cart.map(x=>`• ${x.name} (${x.size}) - ₹${x.price}`).join("\n");
    msg += `\n\n💰 Total: ₹${total}`;

    window.open("https://wa.me/919992537127?text="+encodeURIComponent(msg),"_blank");
};

render();
updateCart();
