const statement = (invoice, plays) => {
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;

    const usd = aNumber => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber / 100);
    };

    const playFor = (aPerformance) => {
        return plays[aPerformance.playID];
    };

    const amountFor = (aPerformance) => {
        let result;
        switch (playFor(aPerformance).type) {
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
                throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
        }
        return result;
    };

    const volumeCreditsFor = aPerformance => {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        /* 희극 관객 5명마다 추가 포인트 제공 */
        if ("comedy" === playFor(aPerformance).type) {
            result += Math.floor(aPerformance.audience / 5);
        }

        return result;
    };

    const totalVolumeCredits = performances => {
        let volumeCredits = 0;
        performances.forEach(perf => {
            volumeCredits += volumeCreditsFor(perf);
        });

        return volumeCredits;
    };

    let totalAmount = 0;
    invoice.performances.forEach(perf => {
        /* 청구 내역 출력 */
        result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
        totalAmount += amountFor(perf);
    });
    result += `총액: ${usd(totalAmount / 100)}\n`;
    result += `적립 포인트: ${totalVolumeCredits(invoice.performances)}점\n`;

    return result;
};

module.exports = statement;
