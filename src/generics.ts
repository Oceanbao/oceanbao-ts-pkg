// without the `extends ...` ReturnType is satisfied (see its declaration)
type GetPromiseReturnType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;

type Result = GetPromiseReturnType<
  () => Promise<{ firstName: string; lastName: string; id: string }>
>;

// Constrain input TObj
type GetKeyWithHighestValue = <TObj extends Record<string, number>>(
  obj: TObj
) => { key: keyof TObj; value: number };

// Sometime, `as` inside generics func is needed
const typedObjectKeys = <TObj extends {}>(obj: TObj) => {
  return Object.keys(obj) as Array<keyof TObj>;
};
const result = typedObjectKeys({
  name: "John",
  age: 30,
});

// Multiple generics
const getValue = <TObj, TKey extends keyof TObj>(obj: TObj, key: TKey) => {
  if (key === "bad") {
    throw Error("Don't access the bad key");
  }
  return obj[key];
};

const result1 = getValue(
  {
    a: 1,
    b: "something",
    c: true,
  },
  "b"
);

// defult generics type T = string

// safe zod fetch
import { z } from "zod";

const makeZodSafeFetch = <TData>(
  url: string,
  schema: z.Schema<TData>
): Promise<TData> => {
  return fetch(url)
    .then((res) => res.json())
    .then((res) => schema.parse(res));
};

const result2 = makeZodSafeFetch(
  "api/endpoint",
  z.object({
    firstName: z.string(),
    lastName: z.string(),
    id: z.string(),
  })
).then((res) => res);
