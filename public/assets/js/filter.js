function openFilterPopup() {
    document.getElementById("filterPopup").style.display = "block";
    document.getElementById("filterOverlay").style.display = "block";
  }
  
  function closeFilterPopup() {
    document.getElementById("filterPopup").style.display = "none";
    document.getElementById("filterOverlay").style.display = "none";
  }
  
  function updatePriceValue() {
    document.getElementById("priceValue").innerText = "₹" + document.getElementById("priceRange").value;
  }
  
  function applyFilters() {
    let selectedCategories = Array.from(document.querySelectorAll(".category-checkbox:checked")).map(checkbox => checkbox.value);
    let selectedSort = document.getElementById("sortPrice").value;
    let maxPrice = document.getElementById("priceRange").value;
    
    let cards = document.querySelectorAll(".card");
    let items = [];
    
    cards.forEach(card => {
      let category = card.querySelector("p:nth-of-type(2)").innerText.split(":")[0].trim();
      let price = parseInt(card.querySelector(".real").innerText.replace("rs", ""));
      
      if ((selectedCategories.length === 0 || selectedCategories.includes(category)) && price <= maxPrice) {
        items.push({ element: card, price: price });
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
    
    if (selectedSort === "lowToHigh") {
      items.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "highToLow") {
      items.sort((a, b) => b.price - a.price);
    }
    
    let container = document.querySelector(".cards-container");
    container.innerHTML = "";
    items.forEach(item => container.appendChild(item.element));
    
    closeFilterPopup();
  }
  
  function removeFilters() {
    document.querySelectorAll('.category-checkbox').forEach(checkbox => checkbox.checked = false);
    document.getElementById('sortPrice').value = 'none';
    document.getElementById('priceRange').value = '2000';
    updatePriceValue();
    
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => card.style.display = 'block');
    
    closeFilterPopup();
  }