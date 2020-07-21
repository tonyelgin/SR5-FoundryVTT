// Simple constant types

// TODO: (Discussion)
//  Undefined is harder to deal with than a predefined string.
//  FVTT should ensure something is there if we tell it to.
//  Make it 'none' instead of null / undefined?
export const NoneType = 'none';
export type NoneType = typeof NoneType;
