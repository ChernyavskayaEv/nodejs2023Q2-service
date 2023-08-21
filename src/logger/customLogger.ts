import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {
    formatMessageFromReq(url, body, query, params): string {
        const message = `URL ${url}, body: ${JSON.stringify(body)}, query: ${JSON.stringify(query)}, params: ${JSON.stringify(params)}`;
        return message;
    }
}