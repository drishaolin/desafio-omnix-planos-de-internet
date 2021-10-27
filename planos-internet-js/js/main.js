function newElement(element, elementClass, text) {
    const e = document.createElement(element);
    e.className = elementClass;
    e.textContent = text;
    return e;
}

for (const offer of offers.userData.offers) {
    const div = newElement("div", "offer-item");
    const h2 = newElement("h2", "offer-name", offer.name);
    const p = newElement("p", "offer-price", `R$ ${offer.price}`);
    div.appendChild(h2);
    div.appendChild(p);

    document.getElementById("offers-list").appendChild(div);
}
