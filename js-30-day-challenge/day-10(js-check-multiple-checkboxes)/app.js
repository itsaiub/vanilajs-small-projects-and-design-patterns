const checkboxesEl = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked;

function handleCheck(e) {
  // check if they had shift key down and they are checking it;
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    checkboxesEl.forEach((checkbox) => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }
  lastChecked = this;
}

checkboxesEl.forEach((checkbox) =>
  checkbox.addEventListener("click", handleCheck)
);
