export class Money {
constructor(public amount: number, public currency: string = 'VND') {
if (amount < 0) throw new Error('Negative money');
}
}