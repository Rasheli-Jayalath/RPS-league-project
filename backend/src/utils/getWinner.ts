export function getWinner(match: any): string | null {
  const a = match.playerA.played;
  const b = match.playerB.played;

  if (a === b) return null;

  if (
    (a === "ROCK" && b === "SCISSORS") ||
    (a === "SCISSORS" && b === "PAPER") ||
    (a === "PAPER" && b === "ROCK")
  ) {
    return match.playerA.name;
  }

  return match.playerB.name;
}