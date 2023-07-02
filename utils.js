export function fontSizer(screenWidth) {
  if (screenWidth > 400) {
    return 30;
  } else if (screenWidth > 250) {
    return 20;
  } else {
    return 18;
  }
}
