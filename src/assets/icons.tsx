import * as React from "react";

export const CopyIcon = ({ onClick }: { onClick: () => void }) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 256 256"
    height="18px"
    width="18px"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path d="M216,34H88a6,6,0,0,0-6,6V82H40a6,6,0,0,0-6,6V216a6,6,0,0,0,6,6H168a6,6,0,0,0,6-6V174h42a6,6,0,0,0,6-6V40A6,6,0,0,0,216,34ZM162,210H46V94H162Zm48-48H174V88a6,6,0,0,0-6-6H94V46H210Z"></path>
  </svg>
);

export const RightIcon = ({ className }: { className: string }) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="18px"
    width="18px"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M13.22 19.03a.75.75 0 0 1 0-1.06L18.19 13H3.75a.75.75 0 0 1 0-1.5h14.44l-4.97-4.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 0 1-1.06 0Z"></path>
  </svg>
);

export const DownIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="direction/down">
      <g id="Union">
        <path
          d="M4.99989 6.03477L1.85915 2.89404C1.81034 2.84522 1.73119 2.84522 1.68237 2.89404L1.24043 3.33598C1.19162 3.38479 1.19162 3.46394 1.24043 3.51276L4.77911 7.05143C4.90115 7.17347 5.09901 7.17347 5.22105 7.05143L8.75978 3.51232C8.80859 3.46351 8.80859 3.38436 8.75977 3.33555L8.31783 2.8936C8.26902 2.84479 8.18987 2.84479 8.14106 2.8936L4.99989 6.03477Z"
          fill="#252525"
        />
      </g>
    </g>
  </svg>
);

export const AddIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="suggest/add">
      <g id="Union">
        <path
          d="M5.43747 8.78125C5.43747 8.85028 5.38151 8.90625 5.31247 8.90625H4.68747C4.61843 8.90625 4.56247 8.85029 4.56247 8.78125V5.43751H1.21875C1.14971 5.43751 1.09375 5.38154 1.09375 5.31251V4.68751C1.09375 4.61847 1.14971 4.56251 1.21875 4.56251H4.56247V1.21875C4.56247 1.14971 4.61843 1.09375 4.68747 1.09375H5.31247C5.38151 1.09375 5.43747 1.14971 5.43747 1.21875V4.56251H8.78125C8.85029 4.56251 8.90625 4.61847 8.90625 4.68751V5.31251C8.90625 5.38154 8.85029 5.43751 8.78125 5.43751H5.43747V8.78125Z"
          fill="#252525"
        />
      </g>
    </g>
  </svg>
);
