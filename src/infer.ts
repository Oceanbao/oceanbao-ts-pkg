export {};

type Result1 = true extends boolean ? 1 : 0;
type Resultb = boolean extends true ? 1 : 0;

const func = (check: boolean) => {
  return "123123123";
};

// infer is used only in conditional checking type
// Compare below with ReturnType: differ in <T> that it is constrainted to be
// a function, whereas where T is general, but then check its shape in 'extends'
// infer R it self is a regex check of return type aliased to R, the ensuing
// `extends string` further checks R's type, then use R in ternary check
type FakeReturnType<T> = T extends ((...args: any) => infer R extends string)
  ? `${R}_return_type`
  : never;

// now func's return type is checked as a special literal type
type ResultF = FakeReturnType<typeof func>;

const funcNever = (check: boolean) => {
  return 123123;
};

// never
type ResultNever = FakeReturnType<typeof funcNever>;

// Type to 'infer' grab deep type C and type it
type GetFromDeepObject<T> = T extends {
  a: {
    b: {
      c: infer C;
    };
  };
}
  ? C
  : never;

// C is boolean type
type C = GetFromDeepObject<{
  a: {
    b: {
      c: boolean;
    };
  };
}>;

// C is never since shape mismatch
type Cnever = GetFromDeepObject<{
  a: {
    b: {
      e: boolean;
    };
  };
}>;
