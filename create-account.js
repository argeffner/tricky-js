function createAccount(pin) {
  let created = false;
  let pnum = null;
  let balance = 0;
  if (!created) {
  pnum = pin;
  created = true;
  }
  return {
    changePin(pin, newPin) {
      if (pin === pnum) {
        pnum = newPin;
        return `successfully changed PIN to: ${pnum}`;
      } else {
          return "Error, Invalid PIN, make sure to enter new pin #"
      }
    },
    checkBalance(pin) {
      if (pin === pnum) {
          return `Here is your balance: ${balance}`; 
        } else {
          return "Error, Invalid PIN";
        }
    },
    deposit(pin, amount) {
      if (pin === pnum) {
        balance = balance + amount;
        return `Deposit of: ${amount}, Balance: ${balance}`; 
      } else {
        return "Error, Invalid PIN";
      }
    },
    withdraw(pin, amount) {
      if (pin === pnum) {
        if (balance - amount < 0) return `You don't have enough money in your account, withdraw less than ${balance}`
        else {
          balance = balance - amount;
          return `Withdrawl of: ${amount}, Balance: ${balance}`;
        }
      } else {
          return "Error, Invalid PIN";
      }
    }
  };
}

module.exports = { createAccount };
