import { random } from "./fisher-yates-shuffle";

it("test random", () => {
  const marks: number[][] = [];
  for (let i = 0; i <= 500; i++) {
    const result = random(5);
    result.forEach((n, i) => {
      if (!marks[n]) {
        marks[n] = [];
      }
      marks[n][i] = (marks[n][i] || 0) + 1;
    });
  }
  console.log(marks);
});
