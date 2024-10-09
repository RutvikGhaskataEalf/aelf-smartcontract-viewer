import React from "react";
import processResponse from "../../hooks/processResponse";

interface ProcessedResponse {
  key: string;
  value: any;
  valueType: string;
}

const ResponseDisplay = ({ response }: { response: any }) => {
  const { key, value, valueType }: ProcessedResponse =
    processResponse(response);

  const objectKey = Object.keys(response);
  const singleKeyResponseType = typeof response[objectKey[0]];

  const isValidKey =
    objectKey.length === 1 && singleKeyResponseType !== "object";
  const isShowJson =
    isValidKey ||
    key.toLocaleLowerCase() === "transactionid" ||
    key.toLocaleLowerCase() === "error";

  if (!isShowJson) {
    return null;
  }

  // Format based on value type
  const formatValue = (val: any, type: string) => {
    if (type === "array") {
      console.log("val", val);
      return val.join(", ");
    } else if (type === "object") {
      return JSON.stringify(val, null, 2);
    } else if (type === "BigInt" || type === "uint256") {
      return val.toString(); // Handle BigInt/Uint256Array display
    }
    return val;
  };

  return (
    <div className="flex items-center gap-2">
      <strong className="text-gray-400">{key}</strong> <i>[{valueType}]</i> :{" "}
      {key.toLocaleLowerCase() === "transactionid" ? (
        <a
          href={
            `https://explorer-test-side02.aelf.io/tx/` +
            formatValue(value, valueType)
          }
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-500"
        >
          {formatValue(value, valueType)}
        </a>
      ) : (
        <p
          className={key.toLocaleLowerCase() === "error" ? "text-red-600" : ""}
        >
          {formatValue(value, valueType)}
        </p>
      )}
    </div>
  );
};

export default ResponseDisplay;
