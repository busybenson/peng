export function scrolltoTop(style = "smooth") {
  return window.scroll({
    top: 0,
    behavior: style ? style : "auto"
  });
}
