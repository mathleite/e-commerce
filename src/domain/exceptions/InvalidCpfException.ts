export default class InvalidCpfException extends Error {
    constructor() {
        super("Invalid CPF");
    }
}