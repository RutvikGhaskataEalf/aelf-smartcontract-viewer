function processResponse(response: any) {
  const key = Object.keys(response)[0];
  let value = response[key];
  let valueType: string;

  if (Array.isArray(value)) {
    valueType = "array";
  } else if (typeof value === "bigint") {
    valueType = "BigInt";
  } else if (typeof value === "boolean") {
    valueType = typeof value;
    value = value.toString();
  } else {
    valueType = typeof value;
  }

  return { key, value, valueType };
}

export default processResponse;
