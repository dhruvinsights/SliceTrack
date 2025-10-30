const orderDialog = document.getElementById("orderDialog");
const doneDialog = document.getElementById("doneDialog");
const statusArea = document.getElementById("statusArea");
const pizzaTitle = document.getElementById("pizzaTitle");

const steps = [
  { name: "Preparing dough", icon: `<svg viewBox='0 0 24 24'><path d='M4 13h16v-2H4v2z'/></svg>` },
  { name: "Adding toppings", icon: `<svg viewBox='0 0 24 24'><path d='M12 2a10 10 0 100 20 10 10 0 000-20zM7 12a5 5 0 0110 0H7z'/></svg>` },
  { name: "Baking pizza", icon: `<svg viewBox='0 0 24 24'><path d='M12 6a9 9 0 100 18 9 9 0 000-18zM12 8a7 7 0 110 14A7 7 0 0112 8z'/></svg>` },
  { name: "Packaging order", icon: `<svg viewBox='0 0 24 24'><path d='M21 8l-9-5-9 5v11l9 5 9-5V8z'/></svg>` },
  { name: "Out for delivery", icon: `<svg viewBox='0 0 24 24'><path d='M5 13l4 4L19 7'/></svg>` },
  { name: "Delivered Successfully!", icon: `<svg viewBox='0 0 24 24'><path d='M9 16.17l-3.88-3.88L4 13.41 9 18.41 20.59 6.83 19.17 5.41z'/></svg>` },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function createStep(text, icon) {
  const div = document.createElement("div");
  div.classList.add("step");
  div.innerHTML = `${icon} <span>${text}</span>`;
  statusArea.appendChild(div);
  return div;
}

async function updateStep(elem) {
  elem.classList.add("active");
  await delay(1500);
  elem.classList.remove("active");
  elem.classList.add("completed");
}

function startOrder(pizza) {
  pizzaTitle.textContent = `Ordering: ${pizza}`;
  statusArea.innerHTML = "";
  orderDialog.showModal();

  let promise = Promise.resolve();

  steps.forEach((step) => {
    const elem = createStep(step.name, step.icon);
    promise = promise.then(() => updateStep(elem));
  });

  promise.then(() => {
    orderDialog.close();
    doneDialog.showModal();
  });
}

function closeDialog(id) {
  document.getElementById(id).close();
}
