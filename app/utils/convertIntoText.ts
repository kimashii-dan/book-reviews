export default function convertIntoText(htmlText: string): string {
  const plainText = htmlText.replace(/<[^>]+>/g, "");

  const decodedText = plainText
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  const sentences = decodedText.split(/(?<=[.!?])\s+/).slice(0, 3);

  return sentences.join(" ");
}
