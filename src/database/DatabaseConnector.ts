interface DatabaseConnector {
    insert(table: string, data: any): boolean;
    select(table: string, needle: any, haystack: any): any;
}