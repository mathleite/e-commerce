import InvalidCpfException from "../exceptions/InvalidCpfException";

export default class CpfValidator {
    private DOCUMENT_LENGTH: number = 11;
    private LEFT_DIGIT_SEQUENCE: number = 10;
    private RIGHT_DIGIT_SEQUENCE: number = 11;

    validate(content: String): void {
        if (!content) throw new InvalidCpfException;
        if (
            !this.isValidSize(content)
            || this.isAllDigitTheSame(content)
            || !this.checkDigits(content)
        ) throw new InvalidCpfException;
    }

    private isValidSize(content: String): boolean {
        return content.length === this.DOCUMENT_LENGTH;
    }

    private isAllDigitTheSame(document: String): boolean {
        const [firstDigit] = document;
        return [...document].every(digit => digit === firstDigit);
    }

    private calculateDigitBySide(document: String, digitSideSequence: number) {
        let total: number = 0;
        for (const digit of document) {
            if (digitSideSequence > 1) {
                // @ts-ignore
                total += digit * digitSideSequence;
                digitSideSequence--;
            }
        }
        const rest = total % this.DOCUMENT_LENGTH;
        return (rest < 2) ? 0 : this.DOCUMENT_LENGTH - rest;
    }

    private checkDigits(document: String): boolean {
        const leftDigit = this.calculateDigitBySide(document, this.LEFT_DIGIT_SEQUENCE);
        const rightDigit = this.calculateDigitBySide(document, this.RIGHT_DIGIT_SEQUENCE);
        const documentDigits = document.slice(-2);
        return documentDigits === `${leftDigit}${rightDigit}`;
    }
}