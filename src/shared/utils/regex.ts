export const noWhitespaceRegex = new RegExp(/^[\S]+(?:\s+[\S]+)*$/, "g");
export const emailRegex = new RegExp(
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
);
