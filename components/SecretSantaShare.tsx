import React, { useState } from "react";
import { SecretSanta } from "types";
import { useRouter } from "next/router";
import Button from "components/Button";
import TextField from "components/TextField";
import Assistant from "components/Assistant";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
}

const SecretSantaShare = ({ secretSanta }: { secretSanta: SecretSanta }) => {
  const router = useRouter();
  const [value, copy] = useCopyToClipboard();
  console.log(router);
  return (
    <div className="h-full flex flex-col justify-center gap-20 p-4">
      <Assistant
        className="flex items-center justify-center"
        message="Share this link with your participants"
        messagePosition="top"
      />
      <div className="flex flex-col gap-4">
        <Button
          kind="primary"
          onClick={() => copy(`${window.location.origin}/${secretSanta.id}`)}
        >
          <span className="flex items-center gap-2 justify-center">
            Copy link
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
              />
            </svg>
          </span>
        </Button>
        <TextField
          label="Secret Santa Link"
          value={`${window.location.origin}/${secretSanta.id}`}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

SecretSantaShare.propTypes = {};

export default SecretSantaShare;
