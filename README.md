# aelf-smartcontract-viewer

The **aelf-smartcontract-viewer** is a React component that provides an easy interface to view and interact with smart contracts on the Aelf blockchain. You can use this component to input contract details and view available read and write methods. This tool is useful for developers building applications around Aelf smart contracts, allowing easy testing and interaction with deployed contracts.

## Installation

You can install the package using npm:

```base
npm install aelf-smartcontract-viewer
```

## Usage

### Basic Example

```typescript
import React from "react";
import { ContractView } from "aelf-smartcontract-viewer";

const App = () => {
  return (
    <div>
      <ContractView
        address="your_smart_contract_address"
        rpcUrl="rpc_url" // i.e = https://explorer-test-side02.aelf.io/chain
        contractName="Smart Contract Name"
      />
    </div>
  );
};

export default App;
```

## Props

| Prop          | Type          | Default                                              | Description                                                                                                  |
| ------------- | ------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `wallet`      | `IWalletInfo` | `undefined`                                          | Optional wallet info. If not provided, a new wallet is generated.                                             |
| `headerTitle` | `string`      | `"Aelf Contract View"`                               | Title for the contract view header.                                                                           |
| `headerShown` | `boolean`     | `true`                                               | Whether the header should be shown or not.                                                                    |
| `address`     | `string`      | `undefined`                                          | Address of the contract. If not provided, a default contract address is fetched from the Aelf blockchain.      |
| `contractName`| `string`      | `"Contract"`                                         | The name of the contract to be displayed.                                                                     |
| `rpcUrl`      | `string`      | `"https://explorer-test-side02.aelf.io/chain"`        | The RPC URL to connect to the Aelf blockchain.                                                                |


## Example Explanation

The above example demonstrates how to use the **`ContractView`** component. You only need to pass in the contract's address, RPC URL, and optionally the contract name.

## Smart Contract Interaction

The **`ContractView`** component displays the available read and write methods from the given smart contract. Once loaded, the methods are grouped as follows:

- **Read Methods:** These are functions you can call to read data from the contract without sending a transaction.
- **Write Methods:** These are functions that will initiate a blockchain transaction to update the state of the contract.

## Example with Wallet

If you want to specify your own wallet, you can pass the **`wallet`** prop. If you don’t provide a wallet, the component will create a new wallet for you and interact with the blockchain using that.

```typescript
import React from "react";
import { ContractView } from "aelf-smartcontract-viewer";
import AElf from "aelf-sdk";

const App = () => {
  const wallet = AElf.wallet.getWalletByPrivateKey("YOUR_PRIVATE_KEY");

  return (
    <div>
      <ContractView
        wallet={wallet}
        address="your_smart_contract_address"
        rpcUrl="rpc_url" // i.e = https://explorer-test-side02.aelf.io/chain
        contractName="Smart Contract Name"
      />
    </div>
  );
}

export default App;
```

## Features

- **Auto Wallet Creation:** If no wallet is provided, the component creates a new wallet.
- **RPC URL Management:** Users can select different RPC URLs for connecting to different blockchain networks.
- **Contract Method Interaction:** The component lists both read and write methods available on the contract, allowing for easy interaction.

## Contributing

We welcome contributions to this project. If you find any bugs or want to add new features, feel free to submit a pull request or open an issue on the [GitHub repository](https://github.com/RutvikGhaskataEalf/aelf-smartcontract-viewer).