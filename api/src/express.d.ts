import { Request } from 'express';

declare module 'express=server-static-core' {
    interface Request {
        ntlm?: {
            DomainName: string;
            UserName: string;
            Workstation: string;
        };
    }
}