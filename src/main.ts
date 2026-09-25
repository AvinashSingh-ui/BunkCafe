import { menuItems } from "./menu";
import { MenuItem, Category } from "./types";

const categoryButtons = document.querySelectorAll<HTMLButtonElement>("[data-category]");

const searchInput=document.getElementById("searchInput") as HTMLInputElement;

const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
const cartCount=document.getElementById("cartCount") as HTMLSpanElement;

let cartItems: MenuItem[] = [];

function renderMenu(items: MenuItem[]): void {
    const menuGrid =
        document.getElementById("menuGrid") as HTMLDivElement;

    menuGrid.innerHTML = "";

    items.forEach((item) => {
        const card = document.createElement("div");

        card.className = "group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl";

        card.innerHTML = `<div class="relative overflow-hidden">
                <img 
                    src="${item.image}" 
                    alt="${item.name}"
                    class="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
                >

                ${
                    item.popular
                        ? `
                    <span class="absolute left-4 top-4 rounded-full bg-coffee-700 px-3 py-1 text-xs font-semibold text-white">
                        Popular
                    </span>
                `
                        : ""
                }

                <span class="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-coffee-800">
                    ${item.category}
                </span>
            </div>

            <div class="p-5">
                <div class="mb-2 flex items-center justify-between gap-3">
                    <h3 class="font-display text-xl font-bold text-coffee-900">
                        ${item.name}
                    </h3>

                    <span class="font-bold text-coffee-700">
                        ₹${item.price}
                    </span>
                </div>

                <p class="mb-5 text-sm leading-6 text-gray-600">
                    ${item.description}
                </p>

                <button
                    data-add="${item.id}"
                    class="w-full rounded-xl bg-coffee-700 px-4 py-3 font-semibold text-white transition hover:bg-coffee-800 active:scale-95"
                >
                    Add to Cart
                </button>
            </div>
        `;

        const addButton =
            card.querySelector<HTMLButtonElement>("[data-add]");

        if (!addButton) {
            return;
        }

        addButton.addEventListener("click", () => {
            const itemId = Number(addButton.dataset.add);

            if (!itemId) {
                return;
            }

            addToCart(itemId);

            console.log("Cart:", cartItems);
        });

        menuGrid.appendChild(card);
    });
}

function filterMenu(category: Category | "all"): void {
    if (category === "all") {
        renderMenu(menuItems);
        return;
    }

    const filteredItems = menuItems.filter((item) => {
        return item.category === category;
    });

    renderMenu(filteredItems);
}

function searchMenu(search: string): void {
    const filteredItems = menuItems.filter((item) => {
        return item.name
            .toLowerCase()
            .includes(search.toLowerCase());
    });

    renderMenu(filteredItems);
}

function addToCart(itemId: number): void {
    const item = menuItems.find((item) => {
        return item.id === itemId;
    });

    if (!item) {
        return;
    }

    cartItems.push(item);
    updateCartCount();
}

function getCartCount(): number {
    return cartItems.length;
}

function updateCartCount(): void{
    cartCount.textContent=`${getCartCount()}`;
}

function bindCategoryFilters(): void {
    categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;

            if (!category) {
                return;
            }

            filterMenu(category as Category | "all");
        });
    });
}

searchBtn.addEventListener("click", () => {
    searchInput.classList.toggle("hidden");
    searchInput.focus();
});

searchInput.addEventListener("input", () => {
    searchMenu(searchInput.value);
});

bindCategoryFilters();
renderMenu(menuItems);

