import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import { IWalletInfo } from "aelf-sdk/types/wallet/index";
import { getContractMethods } from "@portkey/contracts";

import { getAElf } from "../utilities/index";
import { IMethod } from "../interfaces/index";

interface IProps {
  wallet?: IWalletInfo;
  rpc: string;
  contractAddress: string;
}

export const useGetContract = ({ wallet, rpc, contractAddress }: IProps) => {
  const [contract, setContract] = useState<any>();
  const [writeMethods, setWriteMethods] = useState<IMethod[]>([]);
  const [readMethods, setReadMethods] = useState<IMethod[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getContract = useCallback(
    async (rpcValue: string) => {
      if (!contractAddress || !wallet) {
        return;
      }
      setIsLoading(true);
      const hide = message.loading("Get Contract's Methods in progress..", 0);
      try {
        await fetch(
          `https://faucet.aelf.dev/api/claim?walletAddress=${wallet.address}`,
          { method: "POST" }
        );
        const result = await getMethod(rpcValue, contractAddress, wallet);
        if(result === "success") message.success("Get Contract's Methods success!");
      } catch (error) {
        message.error(`Contract's Methods error: ${error}`);
      } finally {
        setIsLoading(false);
        hide();
      }
    },
    [contractAddress,wallet]
  );

  const transferMethods = useCallback(
    async (methodsObj: any, rpcValue: string, contractAddressValue: string) => {
      let viewMethod: string[] = [];
      try {
        const response = await fetch(
          `${rpcValue}/api/contract/ContractViewMethodList?address=${contractAddressValue}`
        );
        if (response.ok) {
          viewMethod = await response.json();
        } else {
          message.error("ContractViewMethodList error");
        }
      } catch (error) {
        message.error(`ContractViewMethodList error: ${error}`);
      }
      const res: IMethod[] = [];
      const readRes: IMethod[] = [];
      const keysArr = Object.keys(methodsObj);
      for (let i = 0; i < keysArr.length; i++) {
        const temp: any = {};
        temp.name = keysArr[i];
        const fields = methodsObj[keysArr[i]].fields;
        temp.input = Object.keys(fields).map((item) => {
          return {
            name: item,
            type: fields[item].type,
          };
        });
        const isRead = viewMethod.includes(temp.name);
        temp.type = !isRead ? "write" : "read";
        temp.fn = methodsObj[keysArr[i]];
        if (isRead) {
          readRes.push(temp);
        } else {
          res.push(temp);
        }
      }
      return {
        readMethods: readRes,
        writeMethods: res,
      };
    },
    []
  );

  const getMethod = useCallback(
    async (
      rpcValue: string,
      contractAddressValue: string,
      walletValue: IWalletInfo
    ) => {
      try {
        const aelfInstance = getAElf(rpcValue);
        const methods = await getContractMethods(
          aelfInstance,
          contractAddressValue
        );
        const tempContract = await aelfInstance.chain.contractAt(
          contractAddressValue,
          walletValue,
          {}
        );
        setContract(tempContract);
        const { readMethods, writeMethods } = await transferMethods(
          methods,
          rpcValue,
          contractAddressValue
        );
        setWriteMethods(writeMethods);
        setReadMethods(readMethods);
        return "success"
      } catch (error) {
        message.error(`Get methods error: ${error}`);
        return "error"
      }
    },
    [transferMethods]
  );

  useEffect(() => {
    if (isLoading) return;
    getContract(rpc);
  }, [rpc, contractAddress, wallet]);

  return {
    contract,
    writeMethods,
    readMethods,
    contractAddress,
    isLoading,
  };
};
