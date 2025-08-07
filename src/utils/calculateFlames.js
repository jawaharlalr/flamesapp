export function calculateFlames(name1, name2) {
  const clean = (str) => str.toLowerCase().replace(/[^a-z]/g, "");
  let a = clean(name1).split(""), b = clean(name2).split("");
  a = a.filter((ch) => {
    const i = b.indexOf(ch);
    if (i !== -1) {
      b.splice(i, 1);
      return false;
    }
    return true;
  });
  const count = a.length + b.length;
  const flames = ["Friends", "Love", "Affection", "Marriage", "Enemy", "Siblings"];
  let i = 0;
  while (flames.length > 1) {
    i = (i + count - 1) % flames.length;
    flames.splice(i, 1);
  }
  return flames[0];
}
