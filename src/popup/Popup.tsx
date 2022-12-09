import React, { useState } from "react";
import { Checkbox, css } from "@mui/material";
import { ConfigOptions } from "../domains/models/popup";

type Props = {
  defaultConfig: ConfigOptions;
};

const Popup: React.VFC<Props> = ({ defaultConfig }) => {
  const [settingOptions, setSettingOptions] = useState(defaultConfig);
  chrome.storage.local.set({ scrollAutoRead: true });
  // const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <>
      各種設定
      <div
        css={css`
          display: flex;
        `}
      >
        <Checkbox defaultChecked />
        <label>スクロール自動既読</label>
      </div>
    </>
  );
};

export default Popup;
