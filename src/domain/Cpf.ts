import InvalidCpfException from "./exceptions/InvalidCpfException";
import CpfValidator from "./validators/CpfValidator";

export default class Cpf {

    private readonly cpf: String;
    private readonly validator = new CpfValidator;

    constructor(content: String) {
        const documentWithoutAnyMask = this.sanitizeDocument(content);
        this.validator.validate(documentWithoutAnyMask);
        this.cpf = documentWithoutAnyMask;
    }

    private sanitizeDocument(content: String): String {
        return content.replace(/\D+/g, "")
    }

    get(isMasked = true): String {
        if (!isMasked) return this.cpf;
        return this.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
}