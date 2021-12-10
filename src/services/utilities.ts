export function shuffleList(list: string[]): string[] {
  const result = [...list];
  let currentIndex = result.length;
  let randomIndex = 0;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [result[currentIndex], result[randomIndex]] = [
      result[randomIndex],
      result[currentIndex],
    ];
  }

  return result;
}

export function codify(value: string): string {
  return value.toLowerCase().replace(/\s/g, "_");
}

export function formatDateTime(ISOdate: string): string {
  const dateObject = new Date(ISOdate);

 
  const options: Intl.DateTimeFormatOptions = {
     // @ts-ignore
    dateStyle: "medium",
  };

  return new Intl.DateTimeFormat("en-US", options).format(dateObject);
}
