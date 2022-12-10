import React from "react";
import {
  Box,
  Button,
  css,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import { ConfigOptions } from "../domains/models/popup";

type Props = {
  defaultConfig?: ConfigOptions;
};

const Popup: React.VFC<Props> = ({ defaultConfig }) => {
  const updatedConfig: ConfigOptions = {};

  const updateConfig = (e) => {
    const key = e.target.name;
    const value = e.target.checked;
    updatedConfig[key] = value;
  };

  const saveConfig = () => {
    for (const key in updatedConfig) {
      console.log(key, updatedConfig[key]);
      chrome.storage.local.set({ [key]: updatedConfig[key] });
    }
    window.close();
  };

  return (
    <div
      css={css`
        width: 300px;
        padding: 10px;
      `}
    >
      <Box
        css={css`
          margin-bottom: 4px;
          font-size: 18px;
        `}
      >
        各種設定
      </Box>
      <FormGroup
        css={css`
          margin: 10px;
        `}
      >
        <FormControlLabel
          control={
            <Switch
              name="scrollAutoRead"
              onChange={updateConfig}
              defaultChecked={defaultConfig.scrollAutoRead}
            />
          }
          label={<Box fontSize={15}>スクロールで既読にする</Box>}
        />
      </FormGroup>
      <div
        css={css`
          display: flex;
          justify-content: center;
          gap: 30px;
        `}
      >
        <Button size="small" variant="outlined" onClick={() => window.close()}>
          キャンセル
        </Button>
        <Button size="small" variant="contained" onClick={saveConfig}>
          保存
        </Button>
      </div>
    </div>
  );
};

export default Popup;
