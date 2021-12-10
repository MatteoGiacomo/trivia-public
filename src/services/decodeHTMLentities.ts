const textAreaElement = document.createElement("textarea");

export function decodeHTMLEntities(text: string): string {
  textAreaElement.textContent = "";
  textAreaElement.innerHTML = text;

  return textAreaElement.value;
}
