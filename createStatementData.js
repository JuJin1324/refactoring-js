const createStatementData = (invoice, plays) => {
    const playFor = (aPerformance) => {
        return plays[aPerformance.playID];
    };

    const amountFor = (aPerformance) => {
        let result;
        switch (aPerformance.play.type) {
            case "tragedy":
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
        }
        return result;
    };

    const volumeCreditsFor = aPerformance => {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        /* 희극 관객 5명마다 추가 포인트 제공 */
        if ("comedy" === aPerformance.play.type) {
            result += Math.floor(aPerformance.audience / 5);
        }

        return result;
    };

    const getTotal = numbers => {
        return numbers.reduce((a, b) => a + b, 0);
    };

    const totalVolumeCredits = data => {
        return getTotal(data.performances.map(perf => perf.volumeCredit));
    };

    const totalAmount = data => {
        return getTotal(data.performances.map(perf => perf.amount));
    };

    const enrichPerformance = aPerformance => {
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        result.amount = amountFor(result);
        result.volumeCredit = volumeCreditsFor(result);

        return result;
    };

    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);

    return statementData;
};

module.exports = createStatementData;

