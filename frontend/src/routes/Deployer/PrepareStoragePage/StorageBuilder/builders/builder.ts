export function extractAnnots(index: number, annots?: string) {
  if (!annots)
    return (Math.floor(index).toString());

  return annots.toString().substring(1);
}