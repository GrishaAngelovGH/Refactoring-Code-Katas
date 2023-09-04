const format = new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD",
  minimumFractionDigits: 2
}).format

const types = {
  "tragedy": (audience, amount = 40000) => {
    if (audience > 30) {
      amount += 1000 * (audience - 30)
    }

    return amount
  },
  "comedy": (audience, amount = 30000) => {
    if (audience > 20) {
      amount += 10000 + 500 * (audience - 20)
    }

    amount += 300 * audience

    return amount
  }
}

function statement(invoice, plays) {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `Statement for ${invoice.customer}\n`

  for (let perf of invoice.performances) {
    const play = plays[perf.playID]

    if (!types[play.type]) throw new Error(`unknown type: ${play.type}`)

    const amount = types[play.type](perf.audience)

    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0)
    // add extra credit for every ten comedy attendees
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5)
    // print line for this order
    result += ` ${play.name}: ${format(amount / 100)} (${perf.audience} seats)\n`
    totalAmount += amount
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`
  result += `You earned ${volumeCredits} credits\n`
  return result
}

module.exports = statement
