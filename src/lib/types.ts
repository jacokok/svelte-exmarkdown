import type { Component } from 'svelte';
import type { Pluggable, Processor } from 'unified';

export type { Component };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = Component<any, any>;
export type ComponentsMap = Record<
	string,
	AnyComponent | string | null | undefined
>;
export type Plugin = {
	remarkPlugin?: Pluggable;
	rehypePlugin?: Pluggable;
	renderer?: ComponentsMap;
};

export type UnistNode = ReturnType<Processor['parse']> & {
	properties?: HastProperties;
};
export type HastBase = UnistNode & {
	properties?: HastProperties;
	children?: HastNode[];
	value?: string;
};
export type HastProperties = Record<string, unknown>;

export type HastLiteral = HastBase & { value: string };
export type HastRoot = HastBase & {
	type: 'root';
	children: (HastElement | HastDoctype | HastComment | HastText)[];
};
export type HastElement = HastBase & {
	type: 'element';
	tagName: string;
	properties?: HastProperties;
	content?: HastRoot;
	children: (HastElement | HastComment | HastText)[];
};
export type HastDoctype = HastBase & { type: 'doctype' };
export type HastComment = HastLiteral & { type: 'comment' };
export type HastText = HastLiteral & { type: 'text' };
export type HastRaw = HastLiteral & { type: 'raw' };

export type HastNode =
	| HastRoot
	| HastElement
	| HastDoctype
	| HastComment
	| HastText
	| HastRaw;

export type Parser = (md: string) => UnistNode;
export type Readable<T> = {
	get current(): T;
	set current(value: T);
};
