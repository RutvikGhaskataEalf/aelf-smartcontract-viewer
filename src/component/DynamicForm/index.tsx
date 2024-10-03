import * as React from "react";
import { Collapse, message } from "antd";
import clsx from "clsx";
import copy from "copy-to-clipboard";
import { IWalletInfo } from "aelf-sdk/types/wallet";

import FormItem from "./formItem";
import "./index.css";
import { getSecondHashValue } from "../../utilities/index";
import EPTooltip from "../EPToolTip/index";
import { IMethod } from "../../interfaces/index";
import { CopyIcon, RightIcon } from "../../assets/icons";

export default function DynamicForm({
  methods,
  contract,
  wallet,
  disabled,
}: {
  methods: IMethod[];
  contract: any;
  wallet?: IWalletInfo;
  disabled: boolean;
}) {
  const handleCopy = (value: string) => {
    message.destroy();
    try {
      copy(value);
      message.success("Copied Successfully");
    } catch {
      message.error("Copy failed, please copy by yourself.");
    }
  };

  React.useEffect(() => {
    const hash = getSecondHashValue(window.location.href);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className="contract-collapse-container pb-4">
      <div className="flex flex-col gap-4">
        {methods.map((item, index) => {
          return (
            <div key={item.name} id={item.name}>
              <Collapse
                collapsible="header"
                expandIconPosition="end"
                expandIcon={({ isActive }: any) => (
                  <RightIcon
                    className={clsx(
                      "arrow text-xs",
                      isActive ? "rotate-90" : "rotate-0"
                    )}
                  />
                )}
                items={[
                  {
                    key: item.name,
                    label: (
                      <div className="w-full truncate pr-1">
                        {index + 1}.
                        <EPTooltip
                          mode="dark"
                          placement="top"
                          title={item.name}
                        >
                          <span> {item.name}</span>
                        </EPTooltip>
                      </div>
                    ),
                    extra: (
                      <div className="flex items-center gap-4">
                        <EPTooltip
                          mode="dark"
                          placement="top"
                          title="Copy Method Name"
                        >
                          <CopyIcon
                            onClick={() => {
                              handleCopy(item.name);
                            }}
                          />
                        </EPTooltip>
                      </div>
                    ),
                    children: (
                      <FormItem
                        wallet={wallet}
                        contract={contract}
                        type={item.type}
                        name={item.name}
                        input={item.input}
                        fn={item.fn}
                        disabled={disabled}
                      />
                    ),
                  },
                ]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
