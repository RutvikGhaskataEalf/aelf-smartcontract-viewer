// Every item made up with title, params input and query button.
import * as React from "react";
import { Divider, Form, Button, Input } from "antd";
import { useEffect, useState } from "react";
import { IWalletInfo } from "aelf-sdk/types/wallet";
import { JSONTree } from "react-json-tree";

import "./index.css";
import ValueFormItem from "./valueFormItem";
import { IMethod } from "../../interfaces/index";
import ResponseDisplay from "./response";

function formatJsonWithTypes(data: any) {
  let result = "";

  // Helper function to process individual entries (objects or arrays)
  function processEntry(entry: any, indent = "") {
    if (Array.isArray(entry)) {
      entry.forEach((item, index) => {
        result += `${indent}${index}: \n`;
        processEntry(item, indent + "  "); // Increase indentation
      });
    } else if (typeof entry === "object" && entry !== null) {
      for (let key in entry) {
        const value = entry[key];
        const valueType = Array.isArray(value) ? "array" : typeof value;

        if (valueType === "object") {
          result += `${indent}${key} [${valueType}]: \n`;
          processEntry(value, indent + "  ");
        } else {
          result += `${indent}${key} [${valueType}]: "${value}"\n`;
        }
      }
    }
  }

  processEntry(data);
  return result;
}

function formatJson(data: any) {
  let result = "";

  // Helper function to process individual entries (objects or arrays)
  function processEntry(entry: any, indent = "") {
    if (Array.isArray(entry)) {
      entry.forEach((item, index) => {
        result += `${indent}${index}: \n`;
        processEntry(item, indent + "  "); // Increase indentation
      });
    } else if (typeof entry === "object" && entry !== null) {
      for (let key in entry) {
        if (typeof entry[key] === "object") {
          result += `${indent}${key}: \n`;
          processEntry(entry[key], indent + "  ");
        } else {
          result += `${indent}${key}: "${entry[key]}"\n`;
        }
      }
    }
  }

  processEntry(data);
  return result;
}

export default function FormItem({
  name,
  input,
  type,
  contract,
  wallet,
  disabled,
}: IMethod & {
  contract: any;
  wallet?: IWalletInfo;
  disabled: boolean;
}) {
  const [form] = Form.useForm();
  const [res, setRes] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [writeLoading, setWriteLoading] = useState<boolean>(false);

  const values = Form.useWatch([], form);
  const [submittable, setSubmittable] = useState<boolean>(false);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((values: { [s: string]: unknown } | ArrayLike<unknown>) => {
        const task = Object.values(values).every((item) => item || item === 0);
        if (task) {
          setSubmittable(true);
        } else {
          setSubmittable(false);
        }
      })
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const query = async () => {
    setLoading(true);
    // get all fileds value with param true
    const filedsValue = form.getFieldsValue();
    try {
      const result =
        filedsValue && Object.keys(filedsValue).length
          ? await contract[name].call(filedsValue)
          : await contract[name].call();
      if (result) {
        setRes(result);
      } else {
        setRes({
          data: null,
        });
      }
    } catch (e: any) {
      setRes(e);
    } finally {
      setLoading(false);
    }
  };

  const write = async () => {
    setWriteLoading(true);
    const filedsValue = form.getFieldsValue();
    try {
      const res = await contract[name](filedsValue);
      setRes(res);
    } catch (e: any) {
      if (e instanceof Error) {
        const obj = {
          name: e.name,
          message: e.message,
          stack: e.stack,
        };
        setRes(obj);
      } else {
        setRes(e);
      }
    } finally {
      setWriteLoading(false);
    }
  };

  const theme = {
    scheme: "monokai",
    author: "wimer hazenberg (http://www.monokai.nl)",
    base00: "transparent",
    base02: "#49483e",
    base03: "#75715e",
    base04: "#a59f85",
    base05: "#f8f8f2",
    base06: "#f5f4f1",
    base07: "#f9f8f5",
    base08: "#f92672",
    base09: "#000",
    base0A: "#f4bf75",
    base0B: "#000",
    base0C: "#a1efe4",
    base0D: "#f92672",
    base0E: "#ae81ff",
    base0F: "#cc6633",
  };

  const response = React.useMemo(() => {
    if (!res) {
      return null;
    } else {
      return ResponseDisplay({ response: res });
    }
  }, [res]);

  return (
    <>
      <Form form={form} layout="vertical" name={name} key={name}>
        {input?.map((ele) =>
          ele.type === "int64" ? (
            <ValueFormItem
              form={form}
              type={ele.type}
              key={ele.name}
              data={ele}
              disabled={disabled}
            />
          ) : (
            <Form.Item key={ele.name} label={ele.name} name={ele.name}>
              <Input size="middle" disabled={disabled} />
            </Form.Item>
          )
        )}
        <Form.Item>
          <div className="flex w-full items-center">
            {type === "read" && (
              <Button
                type="primary"
                size="small"
                className="mr-3 bg-link"
                disabled={disabled || (!submittable && !!input.length)}
                loading={loading}
                onClick={query}
              >
                Query
              </Button>
            )}
            {type === "write" && (
              <Button
                size="small"
                className="bg-link"
                disabled={
                  disabled || !wallet || (!submittable && !!input.length)
                }
                loading={writeLoading}
                type="primary"
                onClick={write}
              >
                Write
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>

      {res && (
        <>
          <Divider dashed />
          <div>Response</div>
          <div className="overflow-x-auto rasponse-box mt-2">
            {!response ? (
              <JSONTree data={res} theme={theme} invertTheme={false} />
            ) : (
              response
            )}
          </div>
        </>
      )}
    </>
  );
}
