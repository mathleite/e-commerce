export default class InvalidCouponQuantityException extends Error {
    constructor() {
        super('Order can\'t has more than one discount');
    }
}