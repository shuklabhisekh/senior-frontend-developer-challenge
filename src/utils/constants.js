export const steps = [{ title: "JS Object" }, { title: "Patches" }];

export const examplePatch = `[
  { "op": "add", "path": "/email", "value": "shuklabhisekh@example.com" },
  { "op": "replace", "path": "/address", "value": "Delhi" },
  { "op": "remove", "path": "/age" },
  { "op": "move", "from": "/address", "path": "/location" },
  { "op": "copy", "from": "/name", "path": "/fullName" }
]`;

export const exampleJSObject = `{
  name: "Abhishek Shukla",
  age: 24,
  address: "Vapi",
}
`;
