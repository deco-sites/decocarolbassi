/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

const displayCart = signal(false);
const displayMenu = signal(false);
const displaySearchPopup = signal(false);
const displaySearchDrawer = signal(false);
const displayGridLayout = signal<number>(2);
const displayProductZoomModal = signal(false);
const productZoomIndex = signal<number>(0);
const storeLocal = signal({
  lat: -23.597981704745184,
  lng: -46.69755666525704
})

const state = {
  displayCart,
  displayMenu,
  displaySearchPopup,
  displaySearchDrawer,
  displayGridLayout,
  displayProductZoomModal,
  productZoomIndex,
  storeLocal
};

// Keyboard event listeners
addEventListener("keydown", (e: KeyboardEvent) => {
  const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

  // Open Searchbar on meta+k
  if (e.metaKey === true && isK) {
    displaySearchPopup.value = true;
  }
});

export const useUI = () => state;
