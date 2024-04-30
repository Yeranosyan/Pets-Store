import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function PSButton({
  buttonText,
  startIcon,
  variant,
  onClick,
  fullWidth,
  style,
}) {
  return (
    <Stack spacing={2} direction="row">
      <Button
        size="small"
        variant={variant}
        onClick={onClick}
        fullWidth={fullWidth}
        style={style}
      >
        {startIcon} {buttonText}
      </Button>
    </Stack>
  );
}
