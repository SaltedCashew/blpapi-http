/// <reference path='../typings/tsd.d.ts' />

import blpapi = require('blpapi');
import restify = require('restify');
import bunyan = require('bunyan');
import BAPI = require('./blpapi-wrapper');
import Session = require('./apisession/session');

export interface IOurRequest extends restify.Request {
    clientCert?: any;
    blpSession: BAPI.Session;
    apiSession?: Session;
    identity?: blpapi.Identity;
}

export interface IBufferedData<T> {
    buffer: T[];
    overflow: number;
}

export interface IOurResponse extends restify.Response {
    sendChunk?: (data: any) => void;
    sendOtherProp?: (properties: { [index: string]: any; }) => void;
    sendEnd?: (status: number, message: string) => void;
    sendWhole?: (status: number,
                 message: string,
                 properties?: { [index: string]: any; },
                 data?: any) => void;
    sendError?: (err: Error) => any;
}

export interface ISocket extends NodeJS.EventEmitter {
    // PROPERTIES
    log: bunyan.Logger; // Add bunyan logger to socket
    blpSession: BAPI.Session;  // Add blpSession to socket

    // MANIPULATORS
    sendData(correlationId: number, data: any): void;
    sendError(message: string): void;
    notifyConnected(): void;
    notifySubscribed(correlationIds: number[]): void;
    notifyUnsubscribed(correlationIds: number[]): void;
    disconnect(): void;

    // ACCESSORS
    isConnected(): boolean;
    getIP(): string;
    getCert(): any;
}
