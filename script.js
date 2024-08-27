$(document).ready(function () {
  const $password = $("#password");
  const $background = $("#background");
  const $strengthIndicator = $("#strength-indicator");

  $password.on("input", function () {
    const input = $(this).val();
    const length = input.length;
    const blurValue = 20 - length * 2;
    $background.css({
      filter: `blur(${blurValue}px)`,
      transition: "filter 0.3s ease",
    });

    updateStrengthIndicator(input);
  });

  function updateStrengthIndicator(password) {
    const strength = calculateStrength(password);
    let strengthClass = "";

    if (strength <= 2) {
      strengthClass = "weak";
    } else if (strength <= 3) {
      strengthClass = "medium";
    } else {
      strengthClass = "strong";
    }

    $strengthIndicator
      .css("width", `${(strength / 5) * 100}%`)
      .removeClass("weak medium strong")
      .addClass(strengthClass);
  }

  function calculateStrength(password) {
    let strength = 0;
    if (password.length > 5) strength++;
    if (password.length > 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  }
});
