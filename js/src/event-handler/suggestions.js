let suggestionDropdownOpen;

export default {
  open: () => {
    suggestionDropdownOpen = true;
  },

  close: () => {
    suggestionDropdownOpen = false;
  },

  isOpen: () => suggestionDropdownOpen,
};
