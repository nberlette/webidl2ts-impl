import type { Document, DocumentType, XMLDocument } from "./globals.js";

export interface DOMImplementation {
  createDocumentType(qualifiedName: string, publicId: string, systemId: string): DocumentType;
  createDocument(namespace: string | null, qualifiedName: string, doctype?: DocumentType | null): XMLDocument;
  createHTMLDocument(title?: string): Document;
  hasFeature(): boolean;
}

export interface DOMImplementationConstructor {
  readonly prototype: DOMImplementation;
}

export declare const DOMImplementation: DOMImplementationConstructor;
