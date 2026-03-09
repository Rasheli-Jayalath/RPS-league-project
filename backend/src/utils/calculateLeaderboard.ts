export function calculateLeaderboard(matches: any[]) {
  const winMap: Record<string, number> = {};

  matches.forEach((match) => {
    const winner = match.winner;

    if (!winner) return;

    if (!winMap[winner]) {
      winMap[winner] = 0;
    }

    winMap[winner]++;
  });

  return Object.entries(winMap)
    .map(([player, wins]) => ({
      player,
      wins,
    }))
    .sort((a, b) => b.wins - a.wins);
}