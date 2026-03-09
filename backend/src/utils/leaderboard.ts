export function calculateLeaderboard(matches: any[]) {

  const leaderboard: Record<string, number> = {};

  matches.forEach((match) => {

    const winner = match.winner;

    if (!leaderboard[winner]) {
      leaderboard[winner] = 0;
    }

    leaderboard[winner]++;

  });

  return Object.entries(leaderboard)
    .map(([player, wins]) => ({
      player,
      wins
    }))
    .sort((a, b) => b.wins - a.wins);

}