export default class InMemoryDatabase implements DatabaseConnector{
    private DATA = {}

    insert(table: string, data: any): boolean {
        try {
            // @ts-ignore
            if (!this.DATA[table]) this.DATA[table] = [];
            // @ts-ignore
            this.DATA[table].push(data);
            return true;
        } catch (exception: any) {
            return false;
        }
    }

    select(table: string, needle: any, haystack: any): object | undefined {
        // @ts-ignore
        return this.DATA[table].find(item => item[needle] === haystack);
    }

}
