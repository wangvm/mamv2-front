export default function ifLoginSmall(login, logout, ifLogin, value) {
  let leftLog = isNaN(parseFloat(login.style.left))
    ? 0
    : parseFloat(login.style.left);
  let rightLog = isNaN(parseFloat(logout.style.right))
    ? 0
    : parseFloat(logout.style.right);
  if (ifLogin) {
    if (value <= 100 - rightLog) {
      login.style.left = value + "%";
    } else {
      login.style.left = value + "%";
      logout.style.right = 100 - value + "%";
    }
  } else {
    if (value > leftLog) {
      logout.style.right = 100 - value + "%";
    } else {
      login.style.left = value + "%";
      logout.style.right = 100 - value + "%";
    }
  }
}