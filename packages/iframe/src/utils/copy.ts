type Options = {
  value: string;
  notSupportCallback: () => void;
  onSuccess?: () => void;
};

export const copyToClipboard = ({
  value,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSuccess = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  notSupportCallback = () => {},
}: Options) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(value);
    onSuccess();
  } else {
    if (!document.queryCommandSupported('copy')) {
      notSupportCallback();
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.display = 'none';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    onSuccess();
  }
};
