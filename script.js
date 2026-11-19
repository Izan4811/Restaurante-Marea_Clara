const account = {
  items: 0,
  total: 0
};

const totalElement = document.querySelector("#account-total");
const countElement = document.querySelector("#item-count");
const resetButton = document.querySelector("#reset-button");
const recommendButton = document.querySelector("#recommend-button");
const recommendationElement = document.querySelector("#recommendation");
const toast = document.querySelector("#toast");

let toastTimer;

function formatPrice(amount) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR"
  }).format(amount);
}

function updateAccount() {
  totalElement.textContent = formatPrice(account.total);
  countElement.textContent = account.items;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

document.querySelectorAll(".dish-card").forEach((card) => {
  const button = card.querySelector(".add-button");

  button.addEventListener("click", () => {
    const name = card.dataset.name;
    const price = Number(card.dataset.price);

    account.items += 1;
    account.total += price;
    updateAccount();
    showToast(`${name} añadido a Mi cuenta`);
  });
});

resetButton.addEventListener("click", () => {
  account.items = 0;
  account.total = 0;
  updateAccount();
  showToast("Mi cuenta está a cero");
});

recommendButton.addEventListener("click", () => {
  const dishes = [...document.querySelectorAll(".dish-card")];
  const chosenDish = dishes[Math.floor(Math.random() * dishes.length)];
  const name = chosenDish.dataset.name;
  const price = Number(chosenDish.dataset.price);
  const description = chosenDish.querySelector(".dish-info p").textContent;

  recommendationElement.innerHTML = `
    <strong>La marea recomienda: ${name}</strong>
    <br>${description} <b>${formatPrice(price)}</b>
  `;
  recommendationElement.hidden = false;
  recommendationElement.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});
