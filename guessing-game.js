function guessingGame() {
  let count = 1;
  let finished = false;
  const secret = Math.floor(Math.random()*100);
 
  return function guesses(val) {
    if (val < secret && !finished) return `${val} is too low`;
    if (val > secret && !finished) return `${val} is too high`;
    // put finished first or else it will never return "The game is over, you already won!"
    if (finished) return "The game is over, you already won!";
    if (val === secret) {
        finished = true;
        let numguess = (count === 1) ? "guess" : "guesses";
        return `You win! You found ${val} in ${count} ${numguess}.`;
    }
    count++;
  };
}

module.exports = { guessingGame };
