import axios from "axios";

test('Should not accept Order with invalid document', async function () {
    const input = {
        order: {
            document: '123456789101'
        }
    };
    const response = await axios.post('http://localhost:8080/checkout', input);
    const output = response.data;
    expect(output.message).toBe('Invalid CPF')
});