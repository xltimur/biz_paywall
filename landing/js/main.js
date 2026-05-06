$(document).ready(function () {
  initBillingToggle();
  initFaqAccordion();
});

function initBillingToggle() {
  const $billingToggles = $("[data-billing-toggle]");
  const $prices = $("[data-price]");
  const $billingNotes = $("[data-billing-note]");

  $billingToggles.on("click", function () {
    setBilling(!$(this).hasClass("is-annual"));
  });

  function setBilling(isAnnual) {
    $billingToggles.toggleClass("is-annual", isAnnual).attr("aria-pressed", String(isAnnual));
    $prices.text(isAnnual ? "$15" : "$30");
    $billingNotes.text(isAnnual ? "billed $180 yearly" : "billed monthly");
  }
}

function initFaqAccordion() {
  const $items = $(".faq__item");
  const animationSpeed = 260;

  $items.each(function () {
    const $item = $(this);
    const $panel = $item.find(".faq__panel");
    const isOpen = $item.hasClass("is-open");

    $item.find(".faq__trigger").attr("aria-expanded", String(isOpen));
    if (isOpen) {
      $panel.show().removeAttr("hidden");
    } else {
      $panel.hide().attr("hidden", "hidden");
    }
  });

  $(".faq__trigger").on("click", function () {
    const $item = $(this).closest(".faq__item");
    const shouldOpen = !$item.hasClass("is-open");

    $items.not($item).each(function () {
      closeAccordionItem($(this), animationSpeed);
    });

    if (shouldOpen) {
      openAccordionItem($item, animationSpeed);
    } else {
      closeAccordionItem($item, animationSpeed);
    }
  });
}

function openAccordionItem($item, animationSpeed) {
  const $panel = $item.find(".faq__panel");

  $item.addClass("is-open").find(".faq__trigger").attr("aria-expanded", "true");
  $panel.stop(true, true).removeAttr("hidden").slideDown(animationSpeed);
}

function closeAccordionItem($item, animationSpeed) {
  if (!$item.hasClass("is-open")) return;

  const $panel = $item.find(".faq__panel");

  $item.removeClass("is-open").find(".faq__trigger").attr("aria-expanded", "false");
  $panel.stop(true, true).slideUp(animationSpeed, function () {
    $panel.attr("hidden", "hidden");
  });
}
